import yaml
import os
import json
import re
import shutil
from pathlib import Path
from typing import List, Dict, Tuple
try:
    from PIL import Image
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("⚠️  Warning: PIL (Pillow) not installed. Image conversion features will be disabled.")

# -----------------------------
# Paths
# -----------------------------
script_dir = os.path.dirname(os.path.abspath(__file__))
business_file = os.path.join(script_dir, "business.yaml")
rules_folder = os.path.join(script_dir, ".cursor/rules/")
templates_folder = os.path.join(script_dir, ".cursor/templates/")

# -----------------------------
# Load business YAML
# -----------------------------
try:
    with open(business_file, "r") as f:
        business = yaml.safe_load(f)
    print(f"✅ Loaded business data from {business_file}")
except FileNotFoundError:
    print(f"❌ Error: {business_file} not found!")
    exit(1)
except Exception as e:
    print(f"❌ Error loading {business_file}: {e}")
    exit(1)

# -----------------------------
# Helper functions
# -----------------------------
def render_value(value, placeholder=None):
    """Converts YAML values to string for template replacement"""
    if isinstance(value, list):
        # JSON array for *_ARRAY or when used in JSON context
        if placeholder and (placeholder.endswith("_ARRAY") or placeholder in ["BLOG_TOPICS", "SERVICES", "LOCATIONS"]):
            return json.dumps(value, indent=2)
        # Plain multi-line list for *_MD (no markdown-specific formatting)
        elif placeholder and placeholder.endswith("_MD"):
            # Handle both string and dict items safely
            items = []
            for item in value:
                if isinstance(item, dict):
                    # For location dictionaries, format as CITY-STATE
                    if 'CITY' in item or 'STATE' in item:
                        city = item.get('CITY', '')
                        state = item.get('STATE', '')
                        if city and state:
                            items.append(f"{city}-{state}")
                        elif city:
                            items.append(city)
                        elif state:
                            items.append(state)
                        else:
                            items.append(str(item))
                    else:
                        items.append(str(item))
                else:
                    items.append(str(item))
            return "\n".join(items)
        # Simple comma list otherwise
        elif all(isinstance(i, dict) for i in value):
            items = []
            for i in value:
                city = i.get('CITY', '')
                state = i.get('STATE', '')
                if city and state:
                    items.append(f"{city}-{state}")
                elif city:
                    items.append(city)
                elif state:
                    items.append(state)
                else:
                    items.append(str(i))
            return ", ".join(items)
        else:
            # Handle mixed types safely
            return ", ".join(str(i) for i in value)
    elif isinstance(value, dict):
        return json.dumps(value, indent=2)
    else:
        return str(value)

def get_nested_value(data, key_path):
    """Get nested dictionary values using dot notation (e.g., CONTACT.PHONE)"""
    keys = key_path.split('.')
    value = data
    for key in keys:
        if isinstance(value, dict) and key in value:
            value = value[key]
        else:
            return None
    return value

def strip_trailing_slash(url):
    """Remove trailing slashes from URLs to prevent double slashes in schema"""
    if not url or not isinstance(url, str):
        return url
    return url.rstrip('/')

def create_missing_placeholders(business_data):
    """Create missing placeholders from existing data"""
    placeholders = {}
    
    # Map existing data to expected placeholders
    placeholders['BUSINESS_NAME'] = business_data.get('BUSINESS_NAME', business_data.get('SITE_NAME', ''))
    placeholders['PRIMARY_KEYWORD'] = business_data.get('PRIMARY_KEYWORD', 'Landscaping')
    # Strip trailing slashes from URLs to prevent double slashes in schema
    website_url = business_data.get('WEBSITE_URL', business_data.get('BASE_URL', ''))
    placeholders['WEBSITE_URL'] = strip_trailing_slash(website_url)
    
    # Handle locations - use existing LOCATIONS_MD if available, otherwise generate from LOCATIONS
    if 'LOCATIONS_MD' in business_data:
        placeholders['LOCATIONS_MD'] = render_value(business_data['LOCATIONS_MD'], 'LOCATIONS_MD')
    else:
        placeholders['LOCATIONS_MD'] = render_value(business_data.get('LOCATIONS', []), 'LOCATIONS_MD')
    
    # Handle services - use flattened lists if available
    # Check for CORE_SERVICES (new hierarchical structure)
    if 'CORE_SERVICES' in business_data:
        placeholders['SERVICES_MD'] = render_value(business_data['CORE_SERVICES'], 'SERVICES_MD')
        placeholders['SERVICES'] = business_data['CORE_SERVICES']
    elif 'SERVICES_MD' in business_data:
        placeholders['SERVICES_MD'] = render_value(business_data['SERVICES_MD'], 'SERVICES_MD')
    else:
        # Handle old format (list of strings) or new format (list of dicts)
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # New hierarchical format - extract service names
            service_names = [s.get('NAME', '') for s in services]
            placeholders['SERVICES_MD'] = render_value(service_names, 'SERVICES_MD')
            placeholders['SERVICES'] = service_names
        else:
            # Old format - simple list
            placeholders['SERVICES_MD'] = render_value(services, 'SERVICES_MD')
            placeholders['SERVICES'] = services
    
    placeholders['CTA_TEXT'] = business_data.get('CTA_TEXT', 'Contact us today for a free consultation!')
    
    # Meta information mapping
    meta = business_data.get('META', {})
    placeholders['META_TITLE'] = meta.get('title', '')
    placeholders['META_DESCRIPTION'] = meta.get('description', '')
    placeholders['KEYWORDS_MD'] = render_value([meta.get('keywords', '')], 'KEYWORDS_MD')
    
    # Page-specific placeholders (these should be filled per-page, but provide defaults)
    placeholders['PAGE_TITLE'] = business_data.get('PAGE_TITLE', '')
    placeholders['PAGE_META_DESCRIPTION'] = business_data.get('PAGE_META_DESCRIPTION', '')
    placeholders['PAGE_KEYWORDS_MD'] = render_value(business_data.get('PAGE_KEYWORDS', []), 'PAGE_KEYWORDS_MD')
    placeholders['PAGE_URL_SLUG'] = business_data.get('PAGE_URL_SLUG', '')
    placeholders['PAGE_CONTENT'] = business_data.get('PAGE_CONTENT', '')
    
    # Create service URLs - use flattened URLs if available
    if 'CORE_SERVICES_URLS' in business_data:
        service_urls = business_data['CORE_SERVICES_URLS']
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    elif 'SERVICES_URLS' in business_data:
        service_urls = business_data['SERVICES_URLS']
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    else:
        # Generate from SERVICES
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # New hierarchical format - extract URLs
            service_urls = [s.get('URL', '') for s in services]
        else:
            # Old format - generate from service names
            service_urls = [f"/{service.lower().replace(' ', '-').replace('(', '').replace(')', '').replace('&', 'and')}/" for service in services]
        placeholders['SERVICES_URLS'] = service_urls
        placeholders['SERVICES_URLS_MD'] = render_value(service_urls, 'SERVICES_URLS_MD')
    
    # Create blog links
    blog_topics = business_data.get('BLOG_TOPICS', [])
    blog_links = [f"/blog/{topic.lower().replace(' ', '-').replace(',', '').replace('&', 'and')}/" for topic in blog_topics]
    placeholders['BLOG_LINKS_MD'] = render_value(blog_links, 'BLOG_LINKS_MD')
    
    # Contact info - handle both uppercase and lowercase keys
    contact = business_data.get('CONTACT', {})
    phone = contact.get('PHONE', contact.get('phone', ''))
    email = contact.get('EMAIL', contact.get('email', ''))
    placeholders['CONTACT_MD'] = business_data.get('CONTACT_MD', f"Phone: {phone} | Email: {email}")
    
    # Arrays for schema
    placeholders['LOCATIONS_ARRAY'] = business_data.get('LOCATIONS_ARRAY', business_data.get('LOCATIONS', []))
    
    # Handle SERVICES_ARRAY - use flattened list if available
    if 'ALL_SERVICES' in business_data:
        placeholders['SERVICES_ARRAY'] = business_data['ALL_SERVICES']
    elif 'SERVICES_ARRAY' in business_data:
        placeholders['SERVICES_ARRAY'] = business_data['SERVICES_ARRAY']
    else:
        services = business_data.get('SERVICES', [])
        if services and isinstance(services[0], dict):
            # Extract service names from hierarchical structure
            service_names = [s.get('NAME', '') for s in services]
            placeholders['SERVICES_ARRAY'] = service_names
        else:
            placeholders['SERVICES_ARRAY'] = services
    
    # Social media profiles
    social_media = business_data.get('SOCIAL_MEDIA', {})
    social_profiles = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            social_profiles.append(data['URL'])
        elif isinstance(data, str) and data:
            social_profiles.append(data)
    placeholders['SOCIAL_PROFILES_ARRAY'] = business_data.get('SOCIAL_PROFILES_ARRAY', social_profiles)
    
    # Area served and language
    locations = business_data.get('LOCATIONS', [])
    if locations and isinstance(locations[0], dict):
        # Handle dictionary locations (CITY-STATE format)
        area_served = []
        for loc in locations:
            city = loc.get('CITY', '')
            state = loc.get('STATE', '')
            if city and state:
                area_served.append(f"{city}, {state}")
            elif city:
                area_served.append(city)
            elif state:
                area_served.append(state)
        placeholders['AREA_SERVED'] = business_data.get('AREA_SERVED', ', '.join(area_served))
    else:
        placeholders['AREA_SERVED'] = business_data.get('AREA_SERVED', ', '.join(str(loc) for loc in locations))
    
    placeholders['AVAILABLE_LANGUAGE'] = business_data.get('AVAILABLE_LANGUAGE', 'English')
    
    return placeholders


# -----------------------------
# Data Generation Functions
# -----------------------------

def generate_faqs(business_data):
    """Generate faq.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/faq.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    locations = business_data.get('LOCATIONS_ARRAY', [])
    service_areas = ', '.join(locations[:4]) if len(locations) > 4 else ', '.join(locations)
    contact = business_data.get('CONTACT', {})
    phone = contact.get('PHONE', '')
    core_services = business_data.get('CORE_SERVICES', [])
    
    faqs = [
        {
            "id": 1,
            "category": "General",
            "question": "What areas do you serve?",
            "answer": f"We proudly serve {service_areas}, along with surrounding areas. Our professional services are available throughout these communities."
        },
        {
            "id": 2,
            "category": "General",
            "question": "How can I contact you?",
            "answer": f"You can reach us at {phone} or email us at {contact.get('EMAIL', '')}. We're available {business_data.get('HOURS', {}).get('MONDAY', '7 days a week')}."
        },
        {
            "id": 3,
            "category": "Services",
            "question": "What services do you offer?",
            "answer": f"We offer {', '.join(core_services)}. Contact us for a free consultation to discuss your specific needs."
        },
        {
            "id": 4,
            "category": "Services",
            "question": "Do you provide free estimates?",
            "answer": f"Yes, we provide completely free, no-obligation estimates for all our services. Contact us at {phone} to schedule your estimate."
        },
        {
            "id": 5,
            "category": "Pricing",
            "question": "How much do your services cost?",
            "answer": "Pricing varies depending on the scope of work, materials needed, and specific requirements. We provide transparent, upfront pricing with no hidden fees. Contact us for a free estimate."
        },
        {
            "id": 6,
            "category": "Scheduling",
            "question": "How quickly can you start a project?",
            "answer": f"We offer same-day service for emergency repairs. For installations and larger projects, we typically can schedule within a few days. Call {phone} to check current availability."
        }
    ]
    
    output_data = {"faqs": faqs}
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_portfolio(business_data):
    """Generate portfolio.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/portfolio.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    locations = business_data.get('LOCATIONS', [])
    core_services = business_data.get('CORE_SERVICES', [])
    
    # Create sample projects for each core service
    projects = []
    project_id = 1
    
    for i, service in enumerate(core_services[:5]):  # Limit to 5 services
        # Get a city for this project
        city_data = locations[i % len(locations)] if locations else {"CITY": "Local Area", "STATE": "TX"}
        city = city_data.get('CITY', 'Local Area') if isinstance(city_data, dict) else city_data
        state = city_data.get('STATE', 'TX') if isinstance(city_data, dict) else 'TX'
        
        projects.append({
            "id": project_id,
            "title": f"Professional {service} Project",
            "category": service,
            "image": "/assets/images/portfolio/placeholder-image.webp",
            "date": "2024",
            "location": f"{city}, {state}",
            "description": f"Complete {service.lower()} with professional installation and quality materials.",
            "features": ["Professional Installation", "Quality Materials", "Expert Service", "Customer Satisfaction"],
            "client": "Residential Client" if i % 2 == 0 else "Commercial Client",
            "duration": "1-2 Days",
            "tags": [service, city, state]
        })
        project_id += 1
    
    # Add portfolio stats
    stats = {
        "totalProjects": 500,
        "happyClients": 450,
        "yearsExperience": 10,
        "averageRating": 4.9
    }
    
    output_data = {
        "stats": stats,
        "projects": projects
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_services_json(business_data):
    """Generate data/services.json from business.yaml
    Supports nested services with multiple levels (e.g., /services/openers/repair/motor/)
    """
    output_path = os.path.join(script_dir, "data/services.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Professional Services')
    services = business_data.get('SERVICES', [])
    locations = business_data.get('LOCATIONS_ARRAY', [])
    primary_city = locations[0] if locations else "Example City, ST"
    
    services_array = []
    
    def create_service_entry(service_dict, parent_slug=None, parent_id=None, level=0):
        """Recursively create service entries for nested services"""
        if not isinstance(service_dict, dict):
            return None
            
        service_name = service_dict.get('NAME', '')
        service_url = service_dict.get('URL', '').strip('/')
        # Preserve nested URL structure: /services/repair/broken-spring/ -> services/repair/broken-spring
        service_slug = service_url if service_url else service_name.lower().replace(' ', '-')
        service_desc = service_dict.get('DESCRIPTION', f'Professional {service_name} solutions')
        sub_services = service_dict.get('SUB_SERVICES', [])
        
        # Determine if this is a core service (top-level, no parent)
        is_core = (parent_slug is None)
        
        # Create service entry
        service_entry = {
            "id": service_slug.replace('/', '-') if '/' in service_slug else service_slug,
            "name": service_name,
            "slug": service_slug,  # Keep nested structure: services/repair/broken-spring
            "description": service_desc,
            "contentSections": {
                "introduction": {
                    "paragraph": f"Professional {service_name.lower()} in {primary_city}. Comprehensive service to ensure smooth operation, enhanced functionality, and long-lasting performance for your home or business."
                },
                "whyMatters": {
                    "heading": f"Transform Your Property with Expert {service_name}",
                    "paragraph": f"Regular {service_name.lower()} maintains smooth, safe, and efficient operation by ensuring your system is properly balanced and functioning correctly. Our trained technicians inspect every component, perform precise adjustments, and ensure your system operates reliably year-round. Professional service extends the life of components while improving safety and preventing costly emergency repairs."
                },
                "process": {
                    "heading": f"Your Journey to Perfect {service_name}",
                    "steps": [
                        {
                            "number": 1,
                            "title": "Free Consultation & Site Evaluation",
                            "description": "We begin with a complimentary on‑site meeting, detailing your needs and options."
                        },
                        {
                            "number": 2,
                            "title": f"Custom {service_name} Selection & Service",
                            "description": f"We help you choose the right solution, install it using top‑quality materials and advanced techniques built for your local climate."
                        },
                        {
                            "number": 3,
                            "title": "Final Inspection & Customer Briefing",
                            "description": "Our technicians perform a thorough quality check, demonstrate safe operation and answer all your questions."
                        }
                    ]
                },
                "challenges": {
                    "heading": f"Solving {service_name} Problems Before They Start",
                    "items": [
                        f"Outdated systems and components that don't match current standards.",
                        f"Systems unable to cope with heavy use or frequent cycles.",
                        f"Weather-impacted components that fail during extreme conditions."
                    ]
                },
                "whyChoose": {
                    "heading": "Experience You Can Trust, Quality You Deserve",
                    "paragraph": f"With over a decade of experience serving {primary_city} area, our licensed technicians guarantee top‑quality service and same‑day scheduling where possible. Get your free quote today, join hundreds of satisfied customers who trust us for durability and performance in every season."
                }
            },
            "category": "Garage Door Services" if is_core else (f"{parent_slug.split('/')[-1].replace('-', ' ').title()} Services" if parent_slug and '/' in parent_slug else "Garage Door Services"),
            "duration": "Typically completed within 1-2 days" if is_core else "Typically completed within 1 day",
            "priceRange": "Contact us for a free quote",
            "isCore": is_core,
            "parentService": parent_id if parent_id else None,
            "features": [
                "Free Consultation",
                "Premium Materials",
                "Licensed Technicians",
                "Quality Guarantee",
                f"{primary_city.split(',')[0]} Climate‑Ready Service"
            ],
            "seo": {
                "metaTitle": f"{service_name} in {primary_city} | {business_name}",
                "metaDescription": f"Need reliable {service_name.lower()} in {primary_city}? {business_name} offers expert service, durable products and free quotes. Call today.",
                "keywords": f"{service_name.lower()}, {primary_city}, {service_name.lower()} service {primary_city.split(',')[0]}, {service_name.lower()} {primary_city.split(',')[0]}"
            },
            "featuredImage": "/assets/images/portfolio/placeholder-image.webp",
            "gallery": [
                "/assets/images/portfolio/placeholder-image.webp",
                "/assets/images/portfolio/placeholder-image.webp",
                "/assets/images/portfolio/placeholder-image.webp"
            ],
            "contentVariations": {
                "opening": f"Transform your property with professional {service_name.lower()} in {primary_city}. Our expert team ensures quality results you can count on.",
                "whyChoose": f"We bring decades of local experience, licensed technicians and premium materials built for your area to every {service_name.lower()} project.",
                "closing": f"Ready to upgrade your {service_name.lower()}? Contact {business_name} today for a free quote."
            },
            "uniqueFaqs": [
                {
                    "question": f"How long does {service_name.lower()} in {primary_city.split(',')[0]} take?",
                    "answer": f"Most {service_name.lower()} projects are completed within 1-2 days depending on scope and any structural changes needed."
                },
                {
                    "question": f"Will the new {service_name.lower()} help with efficiency and performance?",
                    "answer": f"Yes. We provide {service_name.lower()} designed for {primary_city.split(',')[0]} area with quality components and professional installation that protect your property and enhance functionality."
                },
                {
                    "question": f"Do you handle {service_name.lower()} for both residential and commercial properties in {primary_city.split(',')[0]}?",
                    "answer": f"Absolutely. {business_name} serves both homeowners and commercial clients throughout {primary_city} area with tailored {service_name.lower()} solutions."
                }
            ],
            "headerTitle": f"{service_name} in {primary_city}"
        }
        
        return service_entry
    
    # Process all services recursively
    for service in services:
        if not isinstance(service, dict):
            continue
        
        # Create main service entry
        main_service = create_service_entry(service, parent_slug=None, parent_id=None, level=0)
        if main_service:
            services_array.append(main_service)
            main_service_id = main_service['id']
            main_service_slug = main_service['slug']
            
            # Process sub-services recursively
            def process_sub_services(sub_services_list, parent_slug, parent_id, level):
                for sub_service in sub_services_list:
                    if not isinstance(sub_service, dict):
                        continue
                    
                    sub_entry = create_service_entry(
                        sub_service, 
                        parent_slug=parent_slug, 
                        parent_id=parent_id, 
                        level=level
                    )
                    if sub_entry:
                        services_array.append(sub_entry)
                        sub_entry_id = sub_entry['id']
                        sub_entry_slug = sub_entry['slug']
                        
                        # Recursively process nested sub-services
                        nested_sub_services = sub_service.get('SUB_SERVICES', [])
                        if nested_sub_services:
                            process_sub_services(
                                nested_sub_services, 
                                parent_slug=sub_entry_slug, 
                                parent_id=sub_entry_id, 
                                level=level + 1
                            )
            
            # Process first level of sub-services
            sub_services = service.get('SUB_SERVICES', [])
            if sub_services:
                process_sub_services(sub_services, main_service_slug, main_service_id, level=1)
    
    output_data = {"services": services_array}
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_cities_json(business_data):
    """Generate data/cities.json from business.yaml"""
    output_path = os.path.join(script_dir, "data/cities.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Professional Services')
    locations = business_data.get('LOCATIONS', [])
    core_services = business_data.get('CORE_SERVICES', [])
    contact = business_data.get('CONTACT', {})
    primary_city = contact.get('CITY', 'Example City')
    primary_state = contact.get('STATE', 'ST')
    
    cities_array = []
    
    for location in locations:
        if not isinstance(location, dict):
            continue
        
        city_name = location.get('CITY', '')
        state = location.get('STATE', '')
        city_slug = location.get('URL', '').strip('/').replace('/', '-') or f"{city_name.lower().replace(' ', '-')}-{state.lower()}"
        city_id = city_slug
        
        # Generate services list for this city
        city_services = core_services[:5] if len(core_services) >= 5 else core_services
        
        # Create city entry with detailed structure
        city_entry = {
            "id": city_id,
            "name": city_name,
            "state": state,
            "slug": city_slug,
            "description": f"{city_name} is a vibrant community with strong local businesses. Our professional {primary_keyword.lower()} help {city_name} residents and businesses maintain quality and reliability.",
            "content": f"{city_name}'s blend of community spirit and modern amenities makes it an ideal place to live and work. Our comprehensive {primary_keyword.lower()} help residents and companies maintain their properties with professional expertise.\\n\\n## Why Choose Our {city_name} Services\\n\\n- **Local Expertise**: We understand {city_name}'s unique needs\\n- **Fast Response**: Same-day service available for emergencies\\n- **Community Focus**: We're proud members of the {city_name} business community\\n- **Quality Guarantee**: Comprehensive warranties on all services\\n\\n## Popular {city_name} Services\\n\\n" + "\\n".join([f"- {service}" for service in city_services]),
            "population": "50000",
            "area": "25.5",
            "timezone": "Eastern Time",
            "coordinates": {
                "latitude": 40.7128,
                "longitude": -74.006
            },
            "seo": {
                "metaTitle": f"Professional {primary_keyword} in {city_name}, {state} | Quality Solutions",
                "metaDescription": f"Expert {primary_keyword.lower()} in {city_name}, {state}. Residential and commercial solutions with local expertise. Free consultation available!",
                "keywords": f"{primary_keyword.lower()} {city_name} {state}, {city_name} services, {primary_keyword.lower()} {state}"
            },
            "services": city_services,
            "featuredImage": "/assets/config/placeholder-image.png",
            "variationFactors": {
                "environmentalAngle": "suburban-residential",
                "technicalFocus": "quality-reliability",
                "toneArchetype": "professional-friendly",
                "localProof": f"Serving {city_name} since 2015"
            },
            "sectionContent": {
                "services": {
                    "heading": f"Quality Solutions for {city_name}'s Residents",
                    "subheading": f"{city_name} residents deserve services that blend quality with reliability. The truth is, we specialize in solutions that match your lifestyle and needs.",
                    "highlights": [
                        f"Professional services tailored to {city_name} residents",
                        "Local expertise with community knowledge",
                        f"Quality solutions that handle {city_name}'s unique requirements"
                    ],
                    "cta": f"Get Your {city_name} Quote Today"
                },
                "process": {
                    "heading": f"Our Streamlined {city_name} Service Process",
                    "subheading": f"We know {city_name} residents value efficiency and quality. Therefore, our process is designed to deliver exceptional results without disrupting your busy schedule.",
                    "steps": [
                        {
                            "title": "Consultation",
                            "description": f"We visit your {city_name} property at your convenience, bringing expertise and recommendations that showcase what's possible for your space."
                        },
                        {
                            "title": "Custom Planning",
                            "description": f"Our team helps you choose solutions that complement {city_name}'s community style while meeting your specific needs."
                        },
                        {
                            "title": "Professional Service",
                            "description": f"Our certified team completes work efficiently, respecting {city_name} standards and your property."
                        },
                        {
                            "title": "Follow-up Support",
                            "description": f"We ensure your satisfaction and provide ongoing support for {city_name} clients."
                        }
                    ]
                },
                "whySetsApart": {
                    "heading": f"Why {city_name} Trusts Our Service",
                    "subheading": f"The thing is, we've been serving {city_name} for years, and besides our expertise, we bring genuine understanding of what makes this community special.",
                    "features": [
                        {
                            "title": "Local Knowledge",
                            "description": f"We understand {city_name}'s unique requirements and deliver solutions that fit your specific needs."
                        },
                        {
                            "title": "Quality Focus",
                            "description": f"Professional quality in every project we complete in {city_name}."
                        },
                        {
                            "title": "Community Commitment",
                            "description": f"As proud members of the {city_name} business community, we support local initiatives."
                        },
                        {
                            "title": "Comprehensive Warranties",
                            "description": f"We stand behind every project with industry-leading warranties for {city_name} residents."
                        }
                    ]
                },
                "cta": {
                    "heading": f"Ready to Start Your {city_name} Project?",
                    "subheading": f"Join {city_name} residents who've chosen our professional services.",
                    "primaryCTA": f"Schedule Your {city_name} Consultation",
                    "secondaryCTA": "Explore Options"
                }
            },
            "heroTitle": f"Smart {primary_keyword} Solutions for {city_name}'s Modern Living"
        }
        
        cities_array.append(city_entry)
    
    output_data = {"cities": cities_array}
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output_data, f, indent=2)
    
    print(f"✅ Generated: {output_path}")


def generate_things_to_do_json(business_data):
    """Things-to-do JSON generation disabled."""
    print("ℹ️  Skipping things-to-do JSON generation (disabled).")
    return


# Service-in-city pages only exist for these service URLs (must match lib/service-in-city-utils.ts SERVICE_URL_TO_SLUG)
SERVICE_IN_CITY_URLS = [
    "/services/repair/",
    "/services/installation/",
    "/services/replacement/",
    "/services/maintenance/",
    "/services/openers/",
]


def _get_core_service_slugs_and_names(business_data):
    """Return list of (slug, name) for top-level SERVICES that have service-in-city pages (URL in SERVICE_IN_CITY_URLS)."""
    services = business_data.get("SERVICES", [])
    result = []
    for s in services:
        if not isinstance(s, dict):
            continue
        name = s.get("NAME", "")
        url = (s.get("URL") or "").strip("/")
        if not name or not url:
            continue
        url_with_slash = f"/{url}/" if url else ""
        if url_with_slash not in SERVICE_IN_CITY_URLS:
            continue
        slug = name.lower().replace(" ", "-")
        result.append((slug, name))
    return result


def generate_service_in_city_content_json(business_data):
    """Generate data/service-in-city-content.json from business.yaml.
    Template content uses {{cityName}} and {{cityState}}; the app replaces these per city.
    """
    output_path = os.path.join(script_dir, "data", "service-in-city-content.json")
    business_name = business_data.get("BUSINESS_NAME", "Example Company")
    primary_keyword = business_data.get("PRIMARY_KEYWORD", "Professional Services")
    core = _get_core_service_slugs_and_names(business_data)
    services_array = []
    for slug, name in core:
        services_array.append({
            "slug": slug,
            "name": name,
            "sections": [
                {
                    "heading": f"{name} in {{{{cityState}}}}",
                    "body": (
                        f"{name} in {{{{cityState}}}} is provided by {business_name} for homeowners and businesses. "
                        f"In many {{{{cityName}}}} neighborhoods, professional {primary_keyword.lower()} help maintain quality and reliability. "
                        f"{{{{cityName}}}}'s environment places continuous demand on systems; prompt professional service restores function and prevents further issues."
                    ),
                },
                {
                    "heading": f"Local {name} in {{{{cityName}}}}",
                    "body": (
                        f"Common needs include professional assessment, quality materials, and expert installation. "
                        f"{business_name} delivers dependable {name.lower()} solutions throughout {{{{cityName}}}}, "
                        f"with local expertise and comprehensive warranties."
                    ),
                },
            ],
        })
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({"services": services_array}, f, indent=2)
    print(f"✅ Generated: {output_path}")


def generate_service_in_city_json(business_data):
    """Generate data/service-in-city.json from business.yaml.
    Only cities listed in SERVICE_IN_CITY_CITIES (optional) get service-in-city pages;
    if omitted, all LOCATIONS are used. The app derives which cities have these pages from this file.
    """
    output_path = os.path.join(script_dir, "data", "service-in-city.json")
    business_name = business_data.get("BUSINESS_NAME", "Example Company")
    primary_keyword = business_data.get("PRIMARY_KEYWORD", "Professional Services")
    locations = business_data.get("LOCATIONS", [])
    # Explicit list of city slugs that should get service-in-city pages.
    service_in_city_cities = business_data.get("SERVICE_IN_CITY_CITIES")
    if service_in_city_cities and isinstance(service_in_city_cities, list):
        city_slugs_and_names = []
        for slug in service_in_city_cities:
            slug_str = slug if isinstance(slug, str) else str(slug)
            for loc in locations:
                if not isinstance(loc, dict):
                    continue
                c = loc.get("CITY", "")
                st = loc.get("STATE", "ST")
                cs = loc.get("URL", "").strip("/").replace("/", "-") or f"{c.lower().replace(' ', '-')}-{st.lower()}"
                if cs == slug_str:
                    city_slugs_and_names.append((cs, c, st))
                    break
            else:
                city_slugs_and_names.append((slug_str, slug_str.replace("-", " ").title(), "ST"))
    else:
        # No SERVICE_IN_CITY_CITIES defined – do not generate any service-in-city entries.
        city_slugs_and_names = []
    core = _get_core_service_slugs_and_names(business_data)
    service_in_city_entries = []
    for city_slug, city_name, state in city_slugs_and_names:
        for service_slug, service_name in core:
            page_slug = f"{service_slug}-in-{city_slug}"
            title = f"{service_name} in {city_name}, {state}"
            description = f"Professional {service_name} solutions in {city_name}. Custom services designed for {city_name}'s unique needs."
            content_intro = (
                f"{city_name}'s community makes it the perfect place for our specialized {service_name} solutions. "
                f"Our {city_name} services are tailored to local conditions and requirements."
            )
            service_in_city_entries.append({
                "id": page_slug,
                "service": service_name,
                "city": city_name,
                "state": state,
                "slug": page_slug,
                "title": title,
                "description": description,
                "content": content_intro,
                "serviceDetails": {
                    "category": "Professional Service",
                    "duration": "1-3 days",
                    "priceRange": "Contact for quote",
                    "features": ["Local Expertise", "Quality Materials", "Professional Service", "Warranty"],
                },
                "cityInfo": {"name": city_name, "state": state, "population": "50000", "climate": "Temperate", "characteristics": "Local"},
                "seo": {
                    "metaTitle": f"{service_name} in {city_name}, {state} | {business_name}",
                    "metaDescription": f"Professional {service_name} in {city_name}, {state}. Custom solutions for local needs. Free consultation.",
                    "keywords": f"{service_name} {city_name} {state}, {city_name} services, {primary_keyword.lower()} {city_name}",
                },
                "featuredImage": "/images/service-in-city/placeholder.webp",
                "gallery": ["/images/service-in-city/placeholder.webp"] * 3,
            })
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump({"serviceInCity": service_in_city_entries}, f, indent=2)
    print(f"✅ Generated: {output_path} ({len(service_in_city_entries)} service-in-city entries)")


def generate_business_config(business_data):
    """Generate lib/business-config.ts from business.yaml"""
    config_path = os.path.join(script_dir, "lib/business-config.ts")
    
    business_name = business_data.get('BUSINESS_NAME', 'Our Company')
    # Strip trailing slashes from URLs to prevent double slashes in schema
    website_url = strip_trailing_slash(business_data.get('WEBSITE_URL', 'https://example.com'))
    logo_url_raw = business_data.get('LOGO_URL', '')
    if logo_url_raw:
        logo_url = strip_trailing_slash(logo_url_raw)
    else:
        logo_url = f'{website_url}/logo.png'
    tagline = business_data.get('TAGLINE', 'Your Trusted Service Provider')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Services')
    cta_text = business_data.get('CTA_TEXT', 'Contact us today!')
    tone = business_data.get('TONE', 'Professional')
    
    # Categories
    categories = business_data.get('CATEGORIES', {})
    primary_category = categories.get('PRIMARY', 'Service Business')
    secondary_categories = categories.get('SECONDARY', [])
    
    # Services
    services = business_data.get('SERVICES', [])
    
    # Locations
    locations = business_data.get('LOCATIONS', [])
    
    # Contact
    contact = business_data.get('CONTACT', {})
    
    # Webhook
    webhook = business_data.get('WEBHOOK', {})
    
    # Hours
    hours = business_data.get('HOURS', {})
    
    # Google Maps
    google_maps = business_data.get('GOOGLE_MAPS', {})
    
    # Social Media
    social_media = business_data.get('SOCIAL_MEDIA', {})
    
    # Blog Topics
    blog_topics = business_data.get('BLOG_TOPICS', [])
    
    # Meta
    meta = business_data.get('META', {})
    
    # About Page Content
    about = business_data.get('ABOUT', {})
    about_header = about.get('HEADER', {})
    about_stats = about.get('STATS', [])
    about_story = about.get('STORY', {})
    about_mission_values = about.get('MISSION_VALUES', {})
    about_page_header = about.get('PAGE_HEADER', {})
    
    # Services Page Content
    services_page = business_data.get('SERVICES_PAGE', {})
    services_page_header = services_page.get('HEADER', {})
    services_page_intro = services_page.get('INTRODUCTION', {})
    services_page_sections = services_page.get('SECTIONS', {})
    
    # Process template variables in services page content
    # Use provided title or generate default
    services_header_title_raw = services_page_header.get('TITLE', '')
    if not services_header_title_raw or services_header_title_raw.strip() == '':
        services_header_title = f'{business_name}: Professional {primary_keyword} Services'
    else:
        services_header_title = services_header_title_raw.replace('${BUSINESS_NAME}', business_name).replace('${PRIMARY_KEYWORD}', primary_keyword)
    
    # Use provided intro title or generate default
    services_intro_title_raw = services_page_intro.get('TITLE', '')
    if not services_intro_title_raw or services_intro_title_raw.strip() == '':
        services_intro_title = f'Comprehensive {primary_keyword} Solutions'
    else:
        services_intro_title = services_intro_title_raw.replace('${PRIMARY_KEYWORD}', primary_keyword)
    
    # Process paragraph with template variables
    services_intro_paragraph = services_page_intro.get('PARAGRAPH', '')
    services_intro_paragraph = services_intro_paragraph.replace('${PRIMARY_KEYWORD}', primary_keyword)
    services_intro_paragraph = services_intro_paragraph.replace('${PRIMARY_KEYWORD.toLowerCase()}', primary_keyword.lower())
    # If paragraph is empty, use default
    if not services_intro_paragraph or services_intro_paragraph.strip() == '':
        services_intro_paragraph = f"We're your one-stop shop for all {primary_keyword.lower()} needs. From brand new installations to emergency repairs, routine maintenance to complete replacements, our expert team delivers professional service you can trust. Besides our extensive experience, the thing is, we treat every project with the care and attention it deserves."
    
    # Format services for TypeScript
    def format_service(service):
        if isinstance(service, dict):
            name = service.get('NAME', '')
            url = service.get('URL', '')
            sub_services = service.get('SUB_SERVICES', [])
            
            sub_services_str = ""
            if sub_services:
                sub_items = []
                for sub in sub_services:
                    sub_name = sub.get('NAME', '')
                    sub_url = sub.get('URL', '')
                    sub_items.append(f'      {{ name: "{sub_name}", url: "{sub_url}" }}')
                sub_services_str = f",\n    subServices: [\n" + ",\n".join(sub_items) + "\n    ]"
            
            return f'  {{\n    name: "{name}",\n    url: "{url}"{sub_services_str},\n  }}'
        return ''
    
    services_ts = ",\n".join([format_service(s) for s in services])
    
    # Format locations for TypeScript
    def format_location(loc):
        if isinstance(loc, dict):
            city = loc.get('CITY', '')
            state = loc.get('STATE', '')
            url = loc.get('URL', f"/{city.lower().replace(' ', '-')}-{state.lower()}/")
            return f'  {{ city: "{city}", state: "{state}", url: "{url}" }}'
        return ''
    
    locations_ts = ",\n".join([format_location(loc) for loc in locations])
    
    # Format social media
    social_media_entries = []
    for platform, data in social_media.items():
        if isinstance(data, dict) and data.get('URL'):
            url = data['URL']
            social_media_entries.append(f'  {platform.lower()}: "{url}"')
    social_media_ts = ",\n".join(social_media_entries)
    
    # Format secondary categories
    secondary_cat_str = ",\n    ".join([f'"{cat}"' for cat in secondary_categories])
    
    # Format blog topics
    blog_topics_str = ",\n  ".join([f'"{topic}"' for topic in blog_topics])
    
    # Format About stats
    def format_stat(stat):
        if isinstance(stat, dict):
            value = stat.get('VALUE', 0)
            suffix = stat.get('SUFFIX', '')
            label = stat.get('LABEL', '')
            return f'  {{ value: {value}, suffix: "{suffix}", label: "{label}" }}'
        return ''
    
    about_stats_ts = ",\n".join([format_stat(s) for s in about_stats])
    
    # Format About values
    def format_value(val):
        if isinstance(val, dict):
            title = val.get('TITLE', '')
            description = val.get('DESCRIPTION', '')
            return f'  {{ title: "{title}", description: "{description}" }}'
        return ''
    
    about_values = about_mission_values.get('VALUES', [])
    about_values_ts = ",\n".join([format_value(v) for v in about_values])
    
    # Format About page header badges
    about_badges = about_page_header.get('BADGES', [])
    about_badges_ts = ",\n    ".join([f'"{badge}"' for badge in about_badges])
    
    # Generate the TypeScript file
    ts_content = f'''/**
 * Business Configuration - Single Source of Truth
 * This file is AUTO-GENERATED from business.yaml
 * Run `python generate_rules.py` to regenerate
 * DO NOT EDIT THIS FILE DIRECTLY - Edit business.yaml instead
 */

export interface ServiceItem {{
  name: string;
  url: string;
  description?: string;
  subServices?: ServiceItem[];
}}

export interface Location {{
  city: string;
  state: string;
  url?: string;
}}

export interface ContactInfo {{
  address: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  areaCode: string;
  phone: string;
  email: string;
  addressVisibility: 'HIDDEN' | 'VISIBLE';
}}

export interface SocialMedia {{
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  pinterest?: string;
  nextdoor?: string;
  yelp?: string;
  instagram?: string;
  youtube?: string;
}}

export interface GoogleMaps {{
  shortLink: string;
  fullUrl: string;
  embedCode: string;
  latitude: string;
  longitude: string;
}}

export interface BusinessHours {{
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}}

export interface WebhookConfig {{
  enabled: boolean;
  url: string;
  timeout: number;
}}

export interface RecaptchaConfig {{
  enabled: boolean;
  siteKey: string;
  secretKey: string;
}}

export interface GAConfig {{
  enabled: boolean;
  measurementId: string;
}}

// ==========================================
// BUSINESS INFORMATION
// ==========================================
export const BUSINESS_INFO = {{
  name: "{business_name}",
  websiteUrl: "{website_url}",
  tone: "{tone}",
  logoUrl: "{logo_url}",
  tagline: "{tagline}",
  primaryKeyword: "{primary_keyword}",
  ctaText: "{cta_text}",
}} as const;

// ==========================================
// BUSINESS CATEGORIES
// ==========================================
export const BUSINESS_CATEGORIES = {{
  primary: "{primary_category}",
  secondary: [
    {secondary_cat_str}
  ],
}} as const;

// ==========================================
// CORE SERVICES
// ==========================================
export const CORE_SERVICES: ServiceItem[] = [
{services_ts}
];

// Flattened arrays for quick access
export const CORE_SERVICE_NAMES = CORE_SERVICES.map(s => s.name);
export const CORE_SERVICE_URLS = CORE_SERVICES.map(s => s.url);

// All services including sub-services
export const ALL_SERVICES = CORE_SERVICES.flatMap(service => [
  {{ name: service.name, url: service.url }},
  ...(service.subServices || []),
]);

// ==========================================
// SERVICE AREAS / LOCATIONS
// ==========================================
export const LOCATIONS: Location[] = [
{locations_ts}
];

// Helper to get top locations (first 4)
export const TOP_LOCATIONS = LOCATIONS.slice(0, 4);

// Helper to format location string
export const formatLocation = (location: Location): string => 
  `${{location.city}}, ${{location.state}}`;

// ==========================================
// CONTACT INFORMATION
// ==========================================
export const CONTACT: ContactInfo = {{
  address: "{contact.get('ADDRESS', '')}",
  street: "{contact.get('STREET', '')}",
  city: "{contact.get('CITY', '')}",
  state: "{contact.get('STATE', '')}",
  zip: "{contact.get('ZIP', '')}",
  areaCode: "{contact.get('AREA_CODE', '')}",
  phone: "{contact.get('PHONE', '')}",
  email: "{contact.get('EMAIL', '')}",
  addressVisibility: "{contact.get('ADDRESS_VISIBILITY', 'HIDDEN')}", // SAB (Service Area Business)
}};

// ==========================================
// WEBHOOK CONFIGURATION
// ==========================================
// Webhook URL is read from environment variables for security
// Set NEXT_PUBLIC_WEBHOOK_URL in .env.local to enable webhook
export const WEBHOOK_CONFIG: WebhookConfig = {{
  enabled: !!process.env.NEXT_PUBLIC_WEBHOOK_URL && process.env.NEXT_PUBLIC_WEBHOOK_URL.trim() !== '',
  url: process.env.NEXT_PUBLIC_WEBHOOK_URL || '',
  timeout: 10000,
}};

// ==========================================
// RECAPTCHA CONFIGURATION
// ==========================================
// reCAPTCHA keys are read from environment variables
// Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY in .env.local
export const RECAPTCHA_CONFIG: RecaptchaConfig = {{
  enabled: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && 
           !!process.env.RECAPTCHA_SECRET_KEY &&
           process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY.trim() !== '' &&
           process.env.RECAPTCHA_SECRET_KEY.trim() !== '',
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
}} as const;

// ==========================================
// GOOGLE ANALYTICS (gtag / GA4)
// ==========================================
// Recommended: GoogleAnalytics from @next/third-parties/google in root layout.
// See: https://nextjs.org/docs/app/guides/third-party-libraries
// Set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env.local (e.g. G-XXXXXXXXXX)
export const GA_CONFIG: GAConfig = {{
  enabled: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
           process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim() !== '',
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
}} as const;

// ==========================================
// BUSINESS HOURS
// ==========================================
export const BUSINESS_HOURS: BusinessHours = {{
  monday: "{hours.get('MONDAY', '9:00 AM - 5:00 PM')}",
  tuesday: "{hours.get('TUESDAY', '9:00 AM - 5:00 PM')}",
  wednesday: "{hours.get('WEDNESDAY', '9:00 AM - 5:00 PM')}",
  thursday: "{hours.get('THURSDAY', '9:00 AM - 5:00 PM')}",
  friday: "{hours.get('FRIDAY', '9:00 AM - 5:00 PM')}",
  saturday: "{hours.get('SATURDAY', '9:00 AM - 5:00 PM')}",
  sunday: "{hours.get('SUNDAY', 'Closed')}",
}};

// Helper to format business hours for schema
export const BUSINESS_HOURS_SCHEMA = "{business_data.get('BUSINESS_HOURS_SCHEMA', 'Mo-Fr 09:00-17:00')}";

// ==========================================
// GOOGLE MAPS
// ==========================================
export const GOOGLE_MAPS: GoogleMaps = {{
  shortLink: "{google_maps.get('SHORT_LINK', '')}",
  fullUrl: "{google_maps.get('FULL_URL', '')}",
  embedCode: `{google_maps.get('EMBED_CODE', '')}`,
  latitude: "{google_maps.get('LATITUDE', '0')}",
  longitude: "{google_maps.get('LONGITUDE', '0')}",
}};

// ==========================================
// SOCIAL MEDIA
// ==========================================
export const SOCIAL_MEDIA: SocialMedia = {{
{social_media_ts}
}};

// Filter out undefined social media links
export const ACTIVE_SOCIAL_MEDIA = Object.entries(SOCIAL_MEDIA)
  .filter(([_, url]) => url)
  .reduce((acc, [key, url]) => ({{ ...acc, [key]: url }}), {{}}) as SocialMedia;

// ==========================================
// BLOG TOPICS
// ==========================================
export const BLOG_TOPICS = [
  {blog_topics_str}
] as const;

// ==========================================
// META INFORMATION
// ==========================================
export const META = {{
  title: "{meta.get('title', '')}",
  description: "{meta.get('description', '')}",
  keywords: "{meta.get('keywords', '')}",
}} as const;

// ==========================================
// ABOUT PAGE CONTENT
// ==========================================
export interface AboutStat {{
  value: number;
  suffix: string;
  label: string;
}}

export interface AboutValue {{
  title: string;
  description: string;
}}

export interface AboutHeader {{
  badgeText: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  awardCardTitle: string;
  awardCardDescription: string;
  headerImage: string;
  headerImageAlt: string;
}}

export interface AboutStory {{
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image: string;
  imageAlt: string;
}}

export interface AboutMissionValues {{
  title: string;
  description: string;
  values: AboutValue[];
}}

export interface AboutPageHeader {{
  title: string;
  description: string;
  badges: string[];
}}

export const ABOUT_HEADER: AboutHeader = {{
  badgeText: "{about_header.get('BADGE_TEXT', 'About Us')}",
  title: "{about_header.get('TITLE', 'About Us')}",
  titleHighlight: "{about_header.get('TITLE_HIGHLIGHT', '')}",
  description: "{about_header.get('DESCRIPTION', '')}",
  primaryButtonText: "{about_header.get('PRIMARY_BUTTON_TEXT', 'Get Free Consultation')}",
  secondaryButtonText: "{about_header.get('SECONDARY_BUTTON_TEXT', 'View Our Work')}",
  secondaryButtonLink: "{about_header.get('SECONDARY_BUTTON_LINK', '/projects-gallery/')}",
  awardCardTitle: "{about_header.get('AWARD_CARD_TITLE', 'Award-Winning Service')}",
  awardCardDescription: "{about_header.get('AWARD_CARD_DESCRIPTION', '')}",
  headerImage: "{about_header.get('HEADER_IMAGE', '/assets/images/portfolio/house-kitchen-dining-room.webp')}",
  headerImageAlt: "{about_header.get('HEADER_IMAGE_ALT', 'Professional team')}",
}};

export const ABOUT_STATS: AboutStat[] = [
{about_stats_ts}
];

export const ABOUT_STORY: AboutStory = {{
  title: "{about_story.get('TITLE', 'Our Story')}",
  paragraph1: "{about_story.get('PARAGRAPH_1', '')}",
  paragraph2: "{about_story.get('PARAGRAPH_2', '')}",
  paragraph3: "{about_story.get('PARAGRAPH_3', '')}",
  image: "{about_story.get('IMAGE', '/assets/images/portfolio/home-remodeling.webp')}",
  imageAlt: "{about_story.get('IMAGE_ALT', 'Our team')}",
}};

export const ABOUT_MISSION_VALUES: AboutMissionValues = {{
  title: "{about_mission_values.get('TITLE', 'Our Mission & Values')}",
  description: "{about_mission_values.get('DESCRIPTION', '')}",
  values: [
{about_values_ts}
  ],
}};

export const ABOUT_PAGE_HEADER: AboutPageHeader = {{
  title: "{about_page_header.get('TITLE', 'About Us')}",
  description: "{about_page_header.get('DESCRIPTION', '')}",
  badges: [
    {about_badges_ts}
  ],
}};

// ==========================================
// SERVICES PAGE CONTENT
// ==========================================
export interface ServicesPageHeader {{
  title: string;
  subtitle: string;
  description: string;
}}

export interface ServicesPageIntroduction {{
  title: string;
  paragraph: string;
}}

export interface ServicesPageSections {{
  coreServicesTitle: string;
  specializedServicesTitle: string;
}}

export interface ServicesPageContent {{
  header: ServicesPageHeader;
  introduction: ServicesPageIntroduction;
  sections: ServicesPageSections;
}}

export const SERVICES_PAGE_CONTENT: ServicesPageContent = {{
  header: {{
    title: "{services_header_title}",
    subtitle: "{services_page_header.get('SUBTITLE', 'Get to know our services')}",
    description: "{services_page_header.get('DESCRIPTION', 'Complete solutions for installation, repair, maintenance, and replacement')}",
  }},
  introduction: {{
    title: "{services_intro_title}",
    paragraph: "{services_intro_paragraph}",
  }},
  sections: {{
    coreServicesTitle: "{services_page_sections.get('CORE_SERVICES_TITLE', 'Core Services')}",
    specializedServicesTitle: "{services_page_sections.get('SPECIALIZED_SERVICES_TITLE', 'Specialized Services')}",
  }},
}};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

/**
 * Get services formatted for navigation/footer
 */
export const getServicesForNavigation = () => {{
  return CORE_SERVICES.map(service => ({{
    name: service.name,
    href: service.url,
  }}));
}};

/**
 * Get locations formatted for navigation/footer
 */
export const getLocationsForNavigation = (limit?: number) => {{
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(location => ({{
    name: formatLocation(location),
    href: location.url || `/${{location.city.toLowerCase().replace(/\\s+/g, '-')}}-${{location.state.toLowerCase()}}/`,
  }}));
}};

/**
 * Get company links for footer/navigation
 */
export const getCompanyLinks = () => [
  {{ name: "About Us", href: "/about/" }},
  {{ name: "Blog", href: "/blog/" }},
  {{ name: "Contact", href: "/contact/" }},
  {{ name: "Portfolio", href: "/projects-gallery/" }},
  {{ name: "Service Areas", href: "/service-areas/" }},
];

/**
 * Get legal links for footer
 */
export const getLegalLinks = () => [
  {{ name: "Privacy Policy", href: "/privacy-policy/" }},
  {{ name: "Terms & Conditions", href: "/terms/" }},
];

/**
 * Format phone number for display (555-123-4567)
 */
export const formatPhoneDisplay = (phone: string): string => {{
  const digits = phone.replace(/\\D/g, '');
  if (digits.length === 10) {{
    return `${{digits.slice(0, 3)}}-${{digits.slice(3, 6)}}-${{digits.slice(6)}}`;
  }}
  if (digits.length === 11 && digits.startsWith('1')) {{
    const withoutCountryCode = digits.slice(1);
    return `${{withoutCountryCode.slice(0, 3)}}-${{withoutCountryCode.slice(3, 6)}}-${{withoutCountryCode.slice(6)}}`;
  }}
  return phone;
}};

/**
 * Format phone number for tel: links (+15551234567)
 */
export const formatPhoneTel = (phone: string): string => {{
  const digits = phone.replace(/\\D/g, '');
  if (digits.length === 10) {{
    return `+1${{digits}}`;
  }}
  if (digits.length === 11 && digits.startsWith('1')) {{
    return `+${{digits}}`;
  }}
  if (phone.startsWith('+')) {{
    return phone;
  }}
  return `+1${{digits}}`;
}};

export const getPhoneDisplay = (): string => formatPhoneDisplay(CONTACT.phone);
export const getPhoneTel = (): string => formatPhoneTel(CONTACT.phone);
export const getEmail = (): string => CONTACT.email;
export const getBusinessHours = (): BusinessHours => BUSINESS_HOURS;
export const getBusinessHoursForDay = (day: keyof BusinessHours): string => BUSINESS_HOURS[day];
export const getSocialLinks = (): SocialMedia => ACTIVE_SOCIAL_MEDIA;
export const getSocialLink = (platform: keyof SocialMedia): string | undefined => ACTIVE_SOCIAL_MEDIA[platform];
export const getAddress = (): string => CONTACT.address;
export const getCityState = (): string => `${{CONTACT.city}}, ${{CONTACT.state}}`;
export const getGoogleMapsLink = (): string => GOOGLE_MAPS.shortLink;
export const getGoogleMapsUrl = (): string => GOOGLE_MAPS.fullUrl;
export const getBusinessName = (): string => BUSINESS_INFO.name;
export const getTagline = (): string => BUSINESS_INFO.tagline;
export const getPrimaryKeyword = (): string => BUSINESS_INFO.primaryKeyword;
export const getWebsiteUrl = (): string => BUSINESS_INFO.websiteUrl;
export const getTopLocations = (count: number = 4): Location[] => LOCATIONS.slice(0, count);
export const getLocationsString = (limit?: number): string => {{
  const locs = limit ? LOCATIONS.slice(0, limit) : LOCATIONS;
  return locs.map(loc => formatLocation(loc)).join(', ');
}};
export const getPrimaryLocation = (): Location => LOCATIONS[0];
export const getServiceByName = (serviceName: string): ServiceItem | undefined => {{
  return CORE_SERVICES.find(service => service.name === serviceName);
}};
export const getServiceByUrl = (url: string): ServiceItem | undefined => {{
  return CORE_SERVICES.find(service => service.url === url);
}};
export const getSubServices = (serviceName: string): ServiceItem[] => {{
  const service = getServiceByName(serviceName);
  return service?.subServices || [];
}};
export const servesLocation = (city: string, state?: string): boolean => {{
  if (state) {{
    return LOCATIONS.some(loc => 
      loc.city.toLowerCase() === city.toLowerCase() && 
      loc.state.toLowerCase() === state.toLowerCase()
    );
  }}
  return LOCATIONS.some(loc => loc.city.toLowerCase() === city.toLowerCase());
}};
export const getMetaInfo = () => ({{
  title: META.title,
  description: META.description,
  keywords: META.keywords,
}});
export const getBlogTopics = (): readonly string[] => BLOG_TOPICS;
export const getCopyright = (): string => `© ${{new Date().getFullYear()}} ${{BUSINESS_INFO.name}}. All rights reserved.`;
export const getBusinessCategories = () => BUSINESS_CATEGORIES;
export const getBusinessDescription = (): string => {{
  return `Professional ${{BUSINESS_INFO.primaryKeyword}} providing quality solutions and exceptional customer service.`;
}};
export const getContactInfo = () => ({{
  phone: getPhoneDisplay(),
  email: getEmail(),
  address: getAddress(),
}});
export const getSocialLinksFormatted = () => {{
  return Object.entries(ACTIVE_SOCIAL_MEDIA).map(([key, href]) => ({{
    name: key.charAt(0).toUpperCase() + key.slice(1),
    href: href as string,
    key: key as keyof SocialMedia,
  }}));
}};
export const getDefaultAddresses = () => [
  {{
    location: getCityState(),
    address: getAddress(),
  }}
];
export const getDefaultMapLocation = () => ({{
  id: "main-location",
  name: getCityState(),
  address: getAddress(),
  mapEmbed: GOOGLE_MAPS.embedCode.match(/src="([^"]*)"/)?.[1] || "",
  mapTitle: `${{getBusinessName()}} ${{getCityState()}} Location`,
  isMain: true as const,
}});
'''
    
    with open(config_path, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"✅ Generated: {config_path}")

def generate_manifest_json(business_data):
    """Generate public/manifest.json from business.yaml"""
    output_path = os.path.join(script_dir, "public/manifest.json")
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    primary_keyword = business_data.get('PRIMARY_KEYWORD', 'Professional Services')
    meta = business_data.get('META', {})
    locations = business_data.get('LOCATIONS_ARRAY', [])
    primary_city = locations[0] if locations else "Example City, ST"
    
    # Get description
    description = meta.get('description', f"Professional {primary_keyword.lower()} for businesses in {primary_city} and surrounding areas")
    
    # Get categories
    categories = business_data.get('CATEGORIES', {})
    primary_category = categories.get('PRIMARY', 'business')
    category_keywords = [primary_category.lower(), primary_keyword.lower().replace(' ', '_')]
    
    # Create manifest structure
    manifest = {
        "name": f"{business_name} - {primary_keyword}",
        "short_name": business_name,
        "description": description,
        "start_url": "/",
        "display": "standalone",
        "background_color": "#ffffff",
        "theme_color": "#3B82F6",
        "orientation": "portrait-primary",
        "scope": "/",
        "lang": "en-US",
        "categories": category_keywords,
        "icons": [
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "16x16",
                "type": "image/x-icon",
                "purpose": "maskable any"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "512x512",
                "type": "image/x-icon",
                "purpose": "maskable any"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "180x180",
                "type": "image/x-icon"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "32x32",
                "type": "image/x-icon"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "16x16",
                "type": "image/x-icon"
            }
        ],
        "screenshots": [
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "1280x720",
                "type": "image/x-icon",
                "form_factor": "wide"
            },
            {
                "src": "/assets/config/favicon.ico",
                "sizes": "750x1334",
                "type": "image/x-icon",
                "form_factor": "narrow"
            }
        ],
        "shortcuts": [
            {
                "name": "Contact Us",
                "short_name": "Contact",
                "description": "Get in touch with us",
                "url": "/contact",
                "icons": [
                    {
                        "src": "/assets/config/favicon.ico",
                        "sizes": "16x16"
                    }
                ]
            },
            {
                "name": "Our Services",
                "short_name": "Services",
                "description": f"View our professional {primary_keyword.lower()}",
                "url": "/services",
                "icons": [
                    {
                        "src": "/assets/config/favicon.ico",
                        "sizes": "16x16"
                    }
                ]
            }
        ]
    }
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"✅ Generated: {output_path}")

def generate_seo_config(business_data):
    """Update siteConfig in lib/seo-config.ts from business.yaml
    
    NOTE: This function ONLY updates siteConfig, NOT seoConfigs.
    The seoConfigs should be manually maintained because they contain
    imports from business-config.ts and complex logic that can't be
    safely generated via regex replacement.
    """
    config_path = os.path.join(script_dir, "lib/seo-config.ts")
    
    # Read existing file
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            file_content = f.read()
    except FileNotFoundError:
        print(f"⚠️  Warning: {config_path} not found, skipping update")
        return
    
    business_name = business_data.get('BUSINESS_NAME', 'Example Company')
    # Strip trailing slashes from URLs to prevent double slashes in schema
    website_url = strip_trailing_slash(business_data.get('WEBSITE_URL', 'https://example.com'))
    meta = business_data.get('META', {})
    contact = business_data.get('CONTACT', {})
    social_media = business_data.get('SOCIAL_MEDIA', {})
    core_services = business_data.get('CORE_SERVICES', [])
    hours = business_data.get('HOURS', {})
    google_maps = business_data.get('GOOGLE_MAPS', {})
    
    # Format business hours
    monday_hours = hours.get('MONDAY', 'Monday - Friday: 9:00 AM - 6:00 PM')
    
    # Extract social media links
    facebook = social_media.get('FACEBOOK', {}).get('URL', '')
    twitter = social_media.get('TWITTER', {}).get('URL', '')
    linkedin = social_media.get('LINKEDIN', {}).get('URL', '')
    instagram = social_media.get('INSTAGRAM', {}).get('URL', '')
    youtube = social_media.get('YOUTUBE', {}).get('URL', '')
    pinterest = social_media.get('PINTEREST', {}).get('URL', '')
    nextdoor = social_media.get('NEXTDOOR', {}).get('URL', '')
    yelp = social_media.get('YELP', {}).get('URL', '')
    
    # Extract twitter handle
    twitter_handle = twitter.split('/')[-1] if twitter else business_name.lower().replace(' ', '')
    
    # Build social object with only existing links
    social_lines = []
    if facebook:
        social_lines.append(f'    facebook: "{facebook}",')
    if twitter:
        social_lines.append(f'    twitter: "{twitter}",')
        social_lines.append(f'    twitterHandle: "{twitter_handle}",')
    if instagram:
        social_lines.append(f'    instagram: "{instagram}",')
    if linkedin:
        social_lines.append(f'    linkedin: "{linkedin}",')
    if youtube:
        social_lines.append(f'    youtube: "{youtube}",')
    if pinterest:
        social_lines.append(f'    pinterest: "{pinterest}",')
    if nextdoor:
        social_lines.append(f'    nextdoor: "{nextdoor}",')
    if yelp:
        social_lines.append(f'    yelp: "{yelp}",')
    
    # Remove trailing comma from last item
    if social_lines:
        social_lines[-1] = social_lines[-1].rstrip(',')
    
    social_content = '\n'.join(social_lines)
    
    # Build new siteConfig
    new_site_config = f'''export const siteConfig: SiteConfig = {{
  name: BUSINESS_INFO.name,
  url: BUSINESS_INFO.websiteUrl || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '{website_url}'),
  description: `Expert ${{BUSINESS_INFO.primaryKeyword.toLowerCase()}} in ${{CONTACT.city}}, ${{CONTACT.state}}. Quality solutions and customer satisfaction guaranteed. ${{BUSINESS_INFO.ctaText}}`,
  logo: BUSINESS_INFO.logoUrl || "/assets/config/logo.png",
  favicon: "/assets/config/favicon.ico",
  themeColor: "#3B82F6",
  author: BUSINESS_INFO.name,
  copyright: getCopyright(),
  social: {{
    facebook: SOCIAL_MEDIA.facebook,
    twitter: SOCIAL_MEDIA.twitter,
    twitterHandle: SOCIAL_MEDIA.twitter?.split('/').pop(),
    instagram: SOCIAL_MEDIA.instagram,
    linkedin: SOCIAL_MEDIA.linkedin,
    pinterest: SOCIAL_MEDIA.pinterest,
    yelp: SOCIAL_MEDIA.yelp,
    nextdoor: SOCIAL_MEDIA.nextdoor
  }},
  contact: {{
    phone: CONTACT.phone,
    email: CONTACT.email,
    address: CONTACT.street,
    city: CONTACT.city,
    state: CONTACT.state,
    zipCode: CONTACT.zip,
    country: "USA"
  }},
  businessHours: BUSINESS_HOURS_SCHEMA,
  services: CORE_SERVICE_NAMES,
  coordinates: {{
    latitude: GOOGLE_MAPS.latitude,
    longitude: GOOGLE_MAPS.longitude
  }}
}};'''
    
    # Replace siteConfig using a more careful regex that matches balanced braces
    # Find the start of siteConfig
    site_config_start = file_content.find('export const siteConfig: SiteConfig = {')
    if site_config_start == -1:
        print("⚠️  Warning: Could not find siteConfig in file")
        return
    
    # Find the closing of siteConfig by counting braces
    brace_count = 0
    site_config_end = site_config_start
    in_site_config = False
    
    for i in range(site_config_start, len(file_content)):
        char = file_content[i]
        if char == '{':
            brace_count += 1
            in_site_config = True
        elif char == '}':
            brace_count -= 1
            if in_site_config and brace_count == 0:
                # Found the closing brace, look for the semicolon
                site_config_end = i + 1
                if site_config_end < len(file_content) and file_content[site_config_end] == ';':
                    site_config_end += 1
                break
    
    if site_config_end > site_config_start:
        # Replace the old siteConfig with the new one
        file_content = file_content[:site_config_start] + new_site_config + file_content[site_config_end:]
        
        # Write updated content back
        with open(config_path, "w", encoding="utf-8") as f:
            f.write(file_content)
        
        print(f"✅ Updated: {config_path} (siteConfig only - seoConfigs are maintained manually)")
    else:
        print("⚠️  Warning: Could not properly parse siteConfig structure")

# ========================================================================
# IMAGE PROCESSING FUNCTIONS
# ========================================================================

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename by removing spaces and special characters.
    Example: "My Image File!.webp" -> "my-image-file.webp"
    """
    name, ext = os.path.splitext(filename)
    name = name.lower()
    name = name.replace(' ', '-').replace('_', '-')
    name = re.sub(r'[^a-z0-9-]', '', name)
    name = re.sub(r'-+', '-', name)
    name = name.strip('-')
    return f"{name}{ext.lower()}"

def find_image_files(directories: List[str]) -> List[Path]:
    """Find all image files (jpg, jpeg, png, gif) in specified directories."""
    image_extensions = ['*.webp', '*.jpeg', '*.png', '*.gif', '*.webp', '*.JPEG', '*.PNG', '*.GIF']
    all_images = []
    
    for directory in directories:
        dir_path = Path(directory)
        if not dir_path.exists():
            print(f"⚠️  Directory not found: {directory}")
            continue
            
        for ext in image_extensions:
            all_images.extend(dir_path.glob(ext))
            all_images.extend(dir_path.rglob(ext))
    
    return list(set(all_images))

def find_source_files(base_dir: str = '.', exclude_dirs: List[str] = None) -> List[Path]:
    """Find all source code files that might contain image references."""
    if exclude_dirs is None:
        exclude_dirs = ['node_modules', '.next', '.git', 'dist', 'build', 'out', 'public/assets/config']
    
    source_extensions = ['*.tsx', '*.ts', '*.jsx', '*.js', '*.json', '*.css', '*.scss', '*.md']
    source_files = []
    base_path = Path(base_dir)
    
    for ext in source_extensions:
        for file_path in base_path.rglob(ext):
            if any(excluded in file_path.parts for excluded in exclude_dirs):
                continue
            source_files.append(file_path)
    
    return source_files

def update_source_references(source_files: List[Path], filename_mapping: Dict[str, str]) -> Dict[str, int]:
    """Update image references in source files."""
    stats = {'files_modified': 0, 'total_replacements': 0}
    
    for source_file in source_files:
        try:
            with open(source_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            replacements_in_file = 0
            
            for old_name, new_name in filename_mapping.items():
                patterns = [
                    (old_name, new_name),
                    (old_name.replace(' ', '%20'), new_name),
                ]
                
                for old_pattern, new_pattern in patterns:
                    if old_pattern in content:
                        count = content.count(old_pattern)
                        content = content.replace(old_pattern, new_pattern)
                        replacements_in_file += count
            
            if content != original_content:
                with open(source_file, 'w', encoding='utf-8') as f:
                    f.write(content)
                
                stats['files_modified'] += 1
                stats['total_replacements'] += replacements_in_file
                print(f"  ✓ Updated {replacements_in_file} reference(s) in: {source_file.relative_to('.')}")
                
        except Exception as e:
            print(f"  ✗ Error processing {source_file}: {str(e)}")
    
    return stats

def rename_and_convert_images(image_files: List[Path], quality: int = 85, convert_to_webp: bool = True, delete_original: bool = False) -> Tuple[Dict[str, str], Dict[str, int]]:
    """Rename image files and optionally convert to WebP."""
    if not PIL_AVAILABLE:
        print("❌ PIL (Pillow) is not installed. Cannot convert images.")
        print("   Install with: pip install Pillow")
        return {}, {'renamed': 0, 'converted': 0, 'skipped': 0, 'failed': 0}
    
    filename_mapping = {}
    stats = {'renamed': 0, 'converted': 0, 'skipped': 0, 'failed': 0}
    
    for idx, image_file in enumerate(image_files, 1):
        old_filename = image_file.name
        new_filename = sanitize_filename(old_filename)
        
        if old_filename == new_filename and not convert_to_webp:
            print(f"[{idx}/{len(image_files)}] Skipped (already clean): {old_filename}")
            stats['skipped'] += 1
            continue
        
        try:
            new_filepath = image_file.parent / new_filename
            
            # Step 1: Rename the file if needed
            if old_filename != new_filename:
                if new_filepath.exists() and new_filepath != image_file:
                    print(f"[{idx}/{len(image_files)}] ⚠️  Target exists, skipping rename: {old_filename} -> {new_filename}")
                    stats['skipped'] += 1
                    continue
                
                os.rename(image_file, new_filepath)
                filename_mapping[old_filename] = new_filename
                print(f"[{idx}/{len(image_files)}] Renamed: {old_filename} -> {new_filename}")
                stats['renamed'] += 1
                image_file = new_filepath
            
            # Step 2: Convert to WebP if requested
            if convert_to_webp:
                webp_filename = f"{Path(new_filename).stem}.webp"
                webp_filepath = image_file.parent / webp_filename
                
                if webp_filepath.exists():
                    print(f"  → WebP already exists: {webp_filename}")
                else:
                    img = Image.open(image_file)
                    
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    elif img.mode == 'LA':
                        img = img.convert('RGBA')
                    elif img.mode not in ('RGB', 'RGBA', 'L'):
                        img = img.convert('RGB')
                    
                    if img.mode == 'RGBA':
                        img.save(webp_filepath, 'WEBP', quality=quality, method=6, lossless=False)
                    else:
                        img.save(webp_filepath, 'WEBP', quality=quality, method=6)
                    
                    original_size = os.path.getsize(image_file) / 1024
                    webp_size = os.path.getsize(webp_filepath) / 1024
                    savings = ((original_size - webp_size) / original_size) * 100
                    
                    print(f"  → Converted to WebP: {webp_filename} ({original_size:.1f}KB -> {webp_size:.1f}KB, saved {savings:.1f}%)")
                    stats['converted'] += 1
                    
                    if old_filename in filename_mapping:
                        filename_mapping[old_filename] = webp_filename
                    else:
                        filename_mapping[old_filename] = webp_filename
                    
                    if delete_original:
                        os.remove(image_file)
                        print(f"  → Deleted original: {new_filename}")
            
        except Exception as e:
            stats['failed'] += 1
            print(f"[{idx}/{len(image_files)}] ✗ Failed to process {old_filename}: {str(e)}")
    
    return filename_mapping, stats

def process_images(
    image_directories: List[str],
    source_base_dir: str = '.',
    quality: int = 85,
    convert_to_webp: bool = True,
    delete_original: bool = False,
    update_references: bool = True
):
    """Main function to process images: find, rename, update references, and convert."""
    print("="*80)
    print("IMAGE PROCESSING")
    print("="*80)
    print()
    
    # Step 1: Find all image files
    print("📁 Step 1: Finding image files...")
    image_files = find_image_files(image_directories)
    print(f"   Found {len(image_files)} image files\n")
    
    if not image_files:
        print("No image files found. Exiting.")
        return
    
    # Step 2: Rename and convert images
    print("🔄 Step 2: Renaming and converting images...")
    filename_mapping, rename_stats = rename_and_convert_images(
        image_files,
        quality=quality,
        convert_to_webp=convert_to_webp,
        delete_original=delete_original
    )
    print()
    
    # Step 3: Update source code references
    if update_references and filename_mapping:
        print("📝 Step 3: Updating source code references...")
        source_files = find_source_files(source_base_dir)
        print(f"   Found {len(source_files)} source files to check")
        update_stats = update_source_references(source_files, filename_mapping)
        print()
    else:
        update_stats = {'files_modified': 0, 'total_replacements': 0}
    
    # Print final summary
    print("\n" + "="*80)
    print("IMAGE PROCESSING COMPLETE")
    print("="*80)
    print(f"Images renamed:          {rename_stats['renamed']}")
    print(f"Images converted:        {rename_stats['converted']}")
    print(f"Images skipped:          {rename_stats['skipped']}")
    print(f"Images failed:           {rename_stats['failed']}")
    print(f"Source files modified:   {update_stats['files_modified']}")
    print(f"Total replacements:      {update_stats['total_replacements']}")
    print("="*80)

# ========================================================================
# MAIN EXECUTION FUNCTIONS
# ========================================================================

def generate_env_file(
    use_webhook=False,
    use_captcha=False,
    webhook_url="",
    recaptcha_site_key="",
    recaptcha_secret_key="",
    use_ga=False,
    ga_measurement_id="",
):
    """Generate .env.local file with webhook, reCAPTCHA, and optional Google Analytics (gtag / GA4)."""
    env_path = os.path.join(script_dir, ".env.local")
    env_example_path = os.path.join(script_dir, ".env.example")
    
    # Create .env.example template
    env_example_content = """# Contact Form Webhook Configuration
# Leave empty if not using webhook
NEXT_PUBLIC_WEBHOOK_URL=

# Google reCAPTCHA v3 Configuration
# Leave empty if not using reCAPTCHA
# Get your keys from: https://www.google.com/recaptcha/admin
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=

# Google Analytics 4 (gtag) ,  use with @next/third-parties/google GoogleAnalytics
# Docs: https://nextjs.org/docs/app/guides/third-party-libraries
# Measurement ID from GA4 (format G-XXXXXXXXXX)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
"""
    
    # Write .env.example
    try:
        with open(env_example_path, "w", encoding="utf-8") as f:
            f.write(env_example_content)
        print(f"✅ Generated: {env_example_path}")
    except Exception as e:
        print(f"⚠️  Warning: Could not create .env.example: {e}")
    
    # Generate .env.local content
    env_lines = []
    env_lines.append("# Contact Form Webhook Configuration")
    if use_webhook:
        env_lines.append(f"NEXT_PUBLIC_WEBHOOK_URL={webhook_url}")
    else:
        env_lines.append("# NEXT_PUBLIC_WEBHOOK_URL=")
    
    env_lines.append("")
    env_lines.append("# Google reCAPTCHA v3 Configuration")
    env_lines.append("# Get your keys from: https://www.google.com/recaptcha/admin")
    if use_captcha:
        env_lines.append(f"NEXT_PUBLIC_RECAPTCHA_SITE_KEY={recaptcha_site_key}")
        env_lines.append(f"RECAPTCHA_SECRET_KEY={recaptcha_secret_key}")
    else:
        env_lines.append("# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=")
        env_lines.append("# RECAPTCHA_SECRET_KEY=")
    
    env_lines.append("")
    env_lines.append("# Google Analytics 4 (gtag) ,  https://nextjs.org/docs/app/guides/third-party-libraries")
    if use_ga and ga_measurement_id:
        env_lines.append(f"NEXT_PUBLIC_GA_MEASUREMENT_ID={ga_measurement_id}")
    else:
        env_lines.append("# NEXT_PUBLIC_GA_MEASUREMENT_ID=")
    
    env_content = "\n".join(env_lines) + "\n"
    
    # Check if .env.local already exists
    if os.path.exists(env_path):
        print(f"⚠️  .env.local already exists. Updating with new values...")
        # Read existing file and merge
        try:
            with open(env_path, "r", encoding="utf-8") as f:
                existing_content = f.read()
            
            # Update only the lines we care about
            lines = existing_content.split("\n")
            updated_lines = []
            skip_next = False
            
            for i, line in enumerate(lines):
                if skip_next:
                    skip_next = False
                    continue
                    
                if line.startswith("NEXT_PUBLIC_WEBHOOK_URL="):
                    if use_webhook:
                        updated_lines.append(f"NEXT_PUBLIC_WEBHOOK_URL={webhook_url}")
                    else:
                        updated_lines.append("# NEXT_PUBLIC_WEBHOOK_URL=")
                    skip_next = False
                elif line.startswith("NEXT_PUBLIC_RECAPTCHA_SITE_KEY="):
                    if use_captcha:
                        updated_lines.append(f"NEXT_PUBLIC_RECAPTCHA_SITE_KEY={recaptcha_site_key}")
                    else:
                        updated_lines.append("# NEXT_PUBLIC_RECAPTCHA_SITE_KEY=")
                    skip_next = False
                elif line.startswith("RECAPTCHA_SECRET_KEY="):
                    if use_captcha:
                        updated_lines.append(f"RECAPTCHA_SECRET_KEY={recaptcha_secret_key}")
                    else:
                        updated_lines.append("# RECAPTCHA_SECRET_KEY=")
                    skip_next = False
                elif line.startswith("NEXT_PUBLIC_GA_MEASUREMENT_ID=") or line.strip().startswith(
                    "# NEXT_PUBLIC_GA_MEASUREMENT_ID"
                ):
                    if use_ga and ga_measurement_id:
                        updated_lines.append(f"NEXT_PUBLIC_GA_MEASUREMENT_ID={ga_measurement_id}")
                    else:
                        updated_lines.append("# NEXT_PUBLIC_GA_MEASUREMENT_ID=")
                    skip_next = False
                else:
                    updated_lines.append(line)
            
            has_ga_line = any(
                x.startswith("NEXT_PUBLIC_GA_MEASUREMENT_ID=") for x in updated_lines
            )
            if not has_ga_line:
                updated_lines.append("")
                updated_lines.append("# Google Analytics 4 (gtag) ,  https://nextjs.org/docs/app/guides/third-party-libraries")
                if use_ga and ga_measurement_id:
                    updated_lines.append(f"NEXT_PUBLIC_GA_MEASUREMENT_ID={ga_measurement_id}")
                else:
                    updated_lines.append("# NEXT_PUBLIC_GA_MEASUREMENT_ID=")
            
            env_content = "\n".join(updated_lines)
            if not env_content.endswith("\n"):
                env_content += "\n"
        except Exception as e:
            print(f"⚠️  Could not read existing .env.local, creating new one: {e}")
    
    # Write .env.local
    try:
        with open(env_path, "w", encoding="utf-8") as f:
            f.write(env_content)
        print(f"✅ Generated: {env_path}")
        return True
    except Exception as e:
        print(f"❌ Error generating .env.local: {e}")
        return False

def generate_rules_and_data():
    """Generate all rules and data files from business.yaml"""
    # -----------------------------
    # Ask about webhook, captcha, and Google Analytics (gtag)
    # -----------------------------
    print("\n" + "="*80)
    print("CONFIGURE WEBHOOK, RECAPTCHA & GOOGLE ANALYTICS")
    print("="*80)
    
    use_webhook = False
    webhook_url = ""
    use_captcha = False
    recaptcha_site_key = ""
    recaptcha_secret_key = ""
    use_ga = False
    ga_measurement_id = ""
    
    # Ask about webhook
    webhook_choice = input("\nDo you want to enable webhook for contact form? (y/n): ").strip().lower()
    if webhook_choice in ['y', 'yes']:
        use_webhook = True
        webhook_url = input("Enter webhook URL (or press Enter to leave empty): ").strip()
        if not webhook_url:
            webhook_url = ""
            use_webhook = False
            print("⚠️  Webhook disabled (no URL provided)")
    
    # Ask about reCAPTCHA
    captcha_choice = input("\nDo you want to enable Google reCAPTCHA v3? (y/n): ").strip().lower()
    if captcha_choice in ['y', 'yes']:
        use_captcha = True
        recaptcha_site_key = input("Enter reCAPTCHA Site Key (NEXT_PUBLIC_RECAPTCHA_SITE_KEY): ").strip()
        recaptcha_secret_key = input("Enter reCAPTCHA Secret Key (RECAPTCHA_SECRET_KEY): ").strip()
        if not recaptcha_site_key or not recaptcha_secret_key:
            use_captcha = False
            print("⚠️  reCAPTCHA disabled (missing keys)")
    
    # Ask about Google Analytics 4 (gtag via @next/third-parties/google)
    print("\nGoogle Analytics loads the gtag script efficiently from the App Router root layout.")
    print("Reference: https://nextjs.org/docs/app/guides/third-party-libraries")
    ga_choice = input("\nDo you want to enable Google Analytics 4 (gtag / measurement ID)? (y/n): ").strip().lower()
    if ga_choice in ['y', 'yes']:
        use_ga = True
        ga_measurement_id = input(
            "Enter GA4 Measurement ID (NEXT_PUBLIC_GA_MEASUREMENT_ID, e.g. G-XXXXXXXXXX): "
        ).strip()
        if not ga_measurement_id:
            use_ga = False
            print("⚠️  Google Analytics disabled (no measurement ID provided)")
    
    # Generate .env.local file
    if use_webhook or use_captcha or use_ga:
        print("\n" + "="*80)
        print("GENERATING ENVIRONMENT FILE")
        print("="*80)
        generate_env_file(
            use_webhook,
            use_captcha,
            webhook_url,
            recaptcha_site_key,
            recaptcha_secret_key,
            use_ga,
            ga_measurement_id,
        )
    
    # -----------------------------
    # Process all templates
    # -----------------------------
    templates_processed = 0

    # Check if templates folder exists
    if not os.path.exists(templates_folder):
        print(f"❌ Templates folder not found: {templates_folder}")
        print("Please ensure templates are in the correct location.")
        return templates_processed

    print(f"📁 Processing templates from: {templates_folder}")

    for file_name in os.listdir(templates_folder):
        if not file_name.endswith(".template"):
            continue

        template_path = os.path.join(templates_folder, file_name)
        print(f"🔄 Processing: {file_name}")
        
        try:
            with open(template_path, "r", encoding="utf-8") as f:
                template = f.read()

            output_content = template

            # Handle numbered examples if present
            for i in range(1, 5):
                ph = f"EXAMPLE_{i}"
                if ph in output_content:
                    ex_value = business.get("EXAMPLES", [])
                    if len(ex_value) >= i:
                        output_content = output_content.replace(f"{{{{{ph}}}}}", ex_value[i-1])
                    else:
                        output_content = output_content.replace(f"{{{{{ph}}}}}", "")

            # Create missing placeholders
            missing_placeholders = create_missing_placeholders(business)
            
            # Replace all other placeholders dynamically
            placeholders = re.findall(r"{{(.*?)}}", output_content)
            for ph in placeholders:
                # Handle nested dictionary access (e.g., CONTACT.PHONE)
                if '.' in ph:
                    value = get_nested_value(business, ph)
                    # Try lowercase version if not found
                    if value is None:
                        keys = ph.split('.')
                        if len(keys) == 2:
                            parent_key = keys[0]
                            child_key = keys[1].lower()  # Try lowercase
                            if parent_key in business and isinstance(business[parent_key], dict):
                                value = business[parent_key].get(child_key)
                else:
                    value = business.get(ph) or missing_placeholders.get(ph)
                
                if value is not None:
                    rendered_value = render_value(value, ph)
                    output_content = output_content.replace(f"{{{{{ph}}}}}", rendered_value)
                elif ph == "SUPPORTING_TOPICS_MD" and "SUPPORTING_TOPICS" in business:
                    rendered_value = json.dumps(business["SUPPORTING_TOPICS"], indent=2)
                    output_content = output_content.replace(f"{{{{{ph}}}}}", rendered_value)
                else:
                    print(f"⚠️  Warning: Placeholder '{ph}' not found in business data")
                    output_content = output_content.replace(f"{{{{{ph}}}}}", "")

            # Rule 1: Convert <a> tags to <Link> components
            output_content = re.sub(
                r'<a\s+([^>]*?)href=["\']([^"\']*)["\']([^>]*?)>([^<]*)</a>',
                r'<Link href="\2" \1\3>\4</Link>',
                output_content,
                flags=re.IGNORECASE | re.DOTALL
            )

            # Only apply &apos; replacement for .mdc.template files (Cursor rules)
            # Skip for JSON files and TypeScript/JavaScript files
            if file_name.endswith(".mdc.template"):
                protected_content = []
                def protect_and_replace(match):
                    protected_content.append(match.group(0))
                    return f'__PROTECTED_{len(protected_content)-1}__'
                
                # Protect HTML tags, JSX expressions, and JSON-like structures
                output_content = re.sub(r'<[^>]*>|{[^}]*}|\[[^\]]*\]', protect_and_replace, output_content)
                
                # Replace quotes in remaining text (only for rules content)
                output_content = output_content.replace("'", "&apos;")
                
                # Restore protected content
                for i, content in enumerate(protected_content):
                    output_content = output_content.replace(f'__PROTECTED_{i}__', content)

            # Determine output file name and location
            if file_name.endswith(".mdc.template"):
                output_name = file_name.replace(".mdc.template", ".mdc")
                output_file = os.path.join(rules_folder, output_name)
            elif file_name.endswith(".json.template"):
                output_name = file_name.replace(".json.template", ".json")
                output_file = os.path.join(script_dir, "public", output_name)
            else:
                output_name = file_name.replace(".template", ".mdc")
                output_file = os.path.join(rules_folder, output_name)

            # Write output
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(output_content)

            # Validate JSON if it's a JSON file
            if output_file.endswith('.json'):
                try:
                    with open(output_file, "r", encoding="utf-8") as f:
                        json.load(f)
                    print(f"✅ Generated: {output_file} (valid JSON)")
                except json.JSONDecodeError as e:
                    print(f"❌ Generated: {output_file} (INVALID JSON: {e})")
            else:
                print(f"✅ Generated: {output_file}")
            templates_processed += 1
            
        except Exception as e:
            print(f"❌ Error processing {file_name}: {e}")

    # -----------------------------
    # Update Public Files
    # -----------------------------
    # NOTE: robots.txt is handled by app/robots.ts (dynamic Next.js route)
    # which uses siteConfig that's generated from business.yaml
    # No need for static public/robots.txt file

    # -----------------------------
    # Generate Data Files from business.yaml
    # -----------------------------
    print("\n📊 Generating data files from business.yaml...")
    data_files_generated = 0

    try:
        generate_services_json(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating services.json: {e}")

    try:
        generate_cities_json(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating cities.json: {e}")

    try:
        generate_faqs(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating faq.json: {e}")

    try:
        generate_portfolio(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating portfolio.json: {e}")

    try:
        generate_business_config(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating business-config.ts: {e}")

    # Things-to-do generation intentionally disabled (no content/ outputs and no things-to-do JSON).

    try:
        generate_service_in_city_content_json(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating service-in-city-content.json: {e}")

    try:
        generate_service_in_city_json(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating service-in-city.json: {e}")

    try:
        generate_seo_config(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating seo-config.ts: {e}")

    try:
        generate_manifest_json(business)
        data_files_generated += 1
    except Exception as e:
        print(f"❌ Error generating manifest.json: {e}")

    # Summary
    print("\n" + "="*60)
    print("📊 GENERATION SUMMARY")
    print("="*60)

    if templates_processed > 0:
        print(f"\n✅ Templates Processed: {templates_processed}")
        print(f"   📁 Rules location: {rules_folder}")
        print(f"   📁 Public files location: {os.path.join(script_dir, 'public/')}")

    if data_files_generated > 0:
        print(f"\n✅ Data Files Generated: {data_files_generated}")
        print(f"   📁 Data location: {os.path.join(script_dir, 'data/')}")
        print(f"   📁 Public location: {os.path.join(script_dir, 'public/')}")

    print("\n💡 All files are now data-driven from business.yaml!")
    print("   - Update business.yaml to change content")
    print("   - Re-run this script to regenerate all files")
    print("\n✨ AUTO-GENERATED from business.yaml:")
    print("   - data/services.json")
    print("   - data/cities.json")
    print("   - data/faq.json")
    print("   - data/portfolio.json")
    print("   - data/service-in-city-content.json (template with {{cityName}}/{{cityState}})")
    print("   - data/service-in-city.json (optional SERVICE_IN_CITY_CITIES = which cities get these pages)")
    print("   - lib/business-config.ts")
    print("   - lib/seo-config.ts")
    print("   - public/manifest.json")
    print("\n📝 DYNAMIC Next.js Routes (use business.yaml via seo-config):")
    print("   - app/robots.ts → /robots.txt (dynamic)")
    print("   - app/sitemap.ts → /sitemap.xml (dynamic)")
    print("\n" + "="*60)

# ========================================================================
# MAIN MENU
# ========================================================================

if __name__ == "__main__":
    print("="*80)
    print("BUSINESS CONFIGURATION & IMAGE PROCESSING TOOL")
    print("="*80)
    print("\nWhat would you like to do?\n")
    print("1. Generate rules and data files (from business.yaml)")
    print("2. Process images (rename, convert to WebP, update references)")
    print("3. Do both (Generate rules + Process images)")
    print("4. Exit")
    print("\n" + "="*80)
    
    choice = input("\nEnter your choice (1-4): ").strip()
    
    if choice == "1":
        print("\n" + "="*80)
        print("GENERATING RULES AND DATA FILES")
        print("="*80 + "\n")
        generate_rules_and_data()
        
    elif choice == "2":
        print("\n" + "="*80)
        print("IMAGE PROCESSING CONFIGURATION")
        print("="*80 + "\n")
        
        # Image processing configuration
        IMAGE_DIRECTORIES = [
            './public/assets/images',
            './public/assets/images/brands',
            './public/assets/images/portfolio',
            './public/assets/images/services',
        ]
        
        SOURCE_BASE_DIR = '.'
        QUALITY = 85
        CONVERT_TO_WEBP = True
        DELETE_ORIGINAL = True
        UPDATE_REFERENCES = True
        
        print("📋 Configuration:")
        print(f"   Image directories: {IMAGE_DIRECTORIES}")
        print(f"   Source base: {SOURCE_BASE_DIR}")
        print(f"   WebP quality: {QUALITY}")
        print(f"   Convert to WebP: {CONVERT_TO_WEBP}")
        print(f"   Delete originals: {DELETE_ORIGINAL}")
        print(f"   Update references: {UPDATE_REFERENCES}")
        print("\n" + "="*80)
        
        confirm = input("\n⚠️  Press ENTER to start processing (or Ctrl+C to cancel)...")
        print()
        
        process_images(
            image_directories=IMAGE_DIRECTORIES,
            source_base_dir=SOURCE_BASE_DIR,
            quality=QUALITY,
            convert_to_webp=CONVERT_TO_WEBP,
            delete_original=DELETE_ORIGINAL,
            update_references=UPDATE_REFERENCES
        )
        
    elif choice == "3":
        print("\n" + "="*80)
        print("RUNNING BOTH OPERATIONS")
        print("="*80 + "\n")
        
        # First: Generate rules and data
        print("STEP 1: GENERATING RULES AND DATA FILES")
        print("="*80 + "\n")
        generate_rules_and_data()
        
        # Second: Process images
        print("\n\n" + "="*80)
        print("STEP 2: IMAGE PROCESSING")
        print("="*80 + "\n")
        
        IMAGE_DIRECTORIES = [
            './public/assets/images',
            './public/assets/images/brands',
            './public/assets/images/portfolio',
            './public/assets/images/services',
        ]
        
        SOURCE_BASE_DIR = '.'
        QUALITY = 85
        CONVERT_TO_WEBP = True
        DELETE_ORIGINAL = True
        UPDATE_REFERENCES = True
        
        print("📋 Image Processing Configuration:")
        print(f"   Image directories: {IMAGE_DIRECTORIES}")
        print(f"   WebP quality: {QUALITY}")
        print(f"   Convert to WebP: {CONVERT_TO_WEBP}")
        print(f"   Delete originals: {DELETE_ORIGINAL}")
        print(f"   Update references: {UPDATE_REFERENCES}\n")
        
        confirm = input("⚠️  Press ENTER to start image processing (or Ctrl+C to cancel)...")
        print()
        
        process_images(
            image_directories=IMAGE_DIRECTORIES,
            source_base_dir=SOURCE_BASE_DIR,
            quality=QUALITY,
            convert_to_webp=CONVERT_TO_WEBP,
            delete_original=DELETE_ORIGINAL,
            update_references=UPDATE_REFERENCES
        )
        
    elif choice == "4":
        print("\n✅ Exiting. No changes made.")
        exit(0)
        
    else:
        print("\n❌ Invalid choice. Please run the script again and select 1-4.")
        exit(1)
    
    print("\n" + "="*80)
    print("✅ ALL OPERATIONS COMPLETED SUCCESSFULLY")
    print("="*80)