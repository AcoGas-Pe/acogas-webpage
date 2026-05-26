"""
Image Processing Script:
1. Find all image files (jpg, png, gif) in specified folders
2. Sanitize filenames (remove spaces, special characters)
3. Search and replace references in source code
4. Rename image files
5. Convert to WebP format for better compression
"""
import argparse
import os
import re
from pathlib import Path
from PIL import Image
from typing import List, Dict, Tuple

def sanitize_filename(filename: str) -> str:
    """
    Sanitize filename by converting to lowercase, replacing spaces with hyphens,
    and removing all special characters.
    
    Rules:
    - Convert to lowercase
    - Replace spaces with hyphens (-)
    - Remove all special characters (keep only alphanumeric and hyphens)
    - Replace multiple consecutive hyphens with single hyphen
    - Remove leading/trailing hyphens
    
    Example: "My Image File!.webp" -> "my-image-file.webp"
    Example: "Photo@2024#Special.png" -> "photo2024special.png"
    Example: "Image  Name___Test.webp" -> "image-name-test.webp"
    
    Args:
        filename: Original filename
        
    Returns:
        Sanitized filename with lowercase extension
    """
    # Get the file extension
    name, ext = os.path.splitext(filename)
    
    # Convert to lowercase
    name = name.lower()
    
    # Replace spaces with hyphens
    name = name.replace(' ', '-')
    
    # Replace underscores with hyphens (for consistency)
    name = name.replace('_', '-')
    
    # Remove all special characters, keep only alphanumeric and hyphens
    name = re.sub(r'[^a-z0-9-]', '', name)
    
    # Replace multiple consecutive hyphens with single hyphen
    name = re.sub(r'-+', '-', name)
    
    # Remove leading/trailing hyphens
    name = name.strip('-')
    
    # Ensure we have a valid filename (handle edge case where name becomes empty)
    if not name:
        name = 'image'
    
    # Return sanitized filename with lowercase extension
    return f"{name}{ext.lower()}"

def find_image_files(directories: List[str]) -> List[Path]:
    """
    Find all image files (jpg, jpeg, png, gif, webp) in specified directories.
    
    Args:
        directories: List of directory paths to search
        
    Returns:
        List of Path objects for found images
    """
    image_extensions = ['*.webp', '*.jpeg', '*.png', '*.gif', '*.webp', '*.webp', '*.JPEG', '*.PNG', '*.GIF', '*.WEBP']
    all_images = []
    
    for directory in directories:
        dir_path = Path(directory)
        if not dir_path.exists():
            print(f"⚠️  Directory not found: {directory}")
            continue
            
        for ext in image_extensions:
            all_images.extend(dir_path.glob(ext))
            # Also search recursively
            all_images.extend(dir_path.rglob(ext))
    
    # Remove duplicates
    return list(set(all_images))

def find_source_files(base_dir: str = '.', exclude_dirs: List[str] = None) -> List[Path]:
    """
    Find all source code files that might contain image references.
    
    Args:
        base_dir: Base directory to search
        exclude_dirs: Directories to exclude from search
        
    Returns:
        List of Path objects for source files
    """
    if exclude_dirs is None:
        exclude_dirs = ['node_modules', '.next', '.git', 'dist', 'build', 'out', 'public/assets/config']
    
    source_extensions = ['*.tsx', '*.ts', '*.jsx', '*.js', '*.json', '*.css', '*.scss', '*.md']
    source_files = []
    
    base_path = Path(base_dir)
    
    for ext in source_extensions:
        for file_path in base_path.rglob(ext):
            # Check if file is in excluded directory
            if any(excluded in file_path.parts for excluded in exclude_dirs):
                continue
            source_files.append(file_path)
    
    return source_files

def update_source_references(source_files: List[Path], filename_mapping: Dict[str, str]) -> Dict[str, int]:
    """
    Update image references in source files.
    
    Args:
        source_files: List of source files to search
        filename_mapping: Dictionary mapping old filenames to new filenames
        
    Returns:
        Dictionary with statistics about replacements
    """
    stats = {
        'files_modified': 0,
        'total_replacements': 0
    }
    
    for source_file in source_files:
        try:
            with open(source_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            replacements_in_file = 0
            
            # Replace each old filename with new filename
            for old_name, new_name in filename_mapping.items():
                # Create different patterns to match various ways images are referenced
                patterns = [
                    (old_name, new_name),  # Exact match
                    (old_name.replace(' ', '%20'), new_name),  # URL encoded spaces
                ]
                
                for old_pattern, new_pattern in patterns:
                    if old_pattern in content:
                        count = content.count(old_pattern)
                        content = content.replace(old_pattern, new_pattern)
                        replacements_in_file += count
            
            # Only write if content changed
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
    """
    Rename image files and optionally convert to WebP.
    
    Args:
        image_files: List of image files to process
        quality: WebP quality (1-100)
        convert_to_webp: Whether to convert to WebP format
        delete_original: Whether to delete original files after conversion
        
    Returns:
        Tuple of (filename_mapping dict, stats dict)
    """
    filename_mapping = {}
    stats = {
        'renamed': 0,
        'converted': 0,
        'skipped': 0,
        'failed': 0
    }
    
    for idx, image_file in enumerate(image_files, 1):
        old_filename = image_file.name
        new_filename = sanitize_filename(old_filename)
        
        # Skip if filename doesn't need sanitization
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
                image_file = new_filepath  # Update reference
            
            # Step 2: Convert to WebP if requested
            if convert_to_webp:
                # Skip conversion if file is already WebP
                if image_file.suffix.lower() == '.webp':
                    print(f"  → Already WebP format, skipping conversion")
                else:
                    webp_filename = f"{Path(new_filename).stem}.webp"
                    webp_filepath = image_file.parent / webp_filename
                    
                    # Skip if WebP already exists
                    if webp_filepath.exists():
                        print(f"  → WebP already exists: {webp_filename}")
                    else:
                        # Open and convert image
                        img = Image.open(image_file)
                        
                        # Handle different image modes while preserving transparency
                        if img.mode == 'P':
                            img = img.convert('RGBA')
                        elif img.mode == 'LA':
                            img = img.convert('RGBA')
                        elif img.mode not in ('RGB', 'RGBA', 'L'):
                            img.convert('RGB')
                        
                        # Save as WebP
                        if img.mode == 'RGBA':
                            img.save(webp_filepath, 'WEBP', quality=quality, method=6, lossless=False)
                        else:
                            img.save(webp_filepath, 'WEBP', quality=quality, method=6)
                        
                        # Get file sizes
                        original_size = os.path.getsize(image_file) / 1024
                        webp_size = os.path.getsize(webp_filepath) / 1024
                        savings = ((original_size - webp_size) / original_size) * 100
                        
                        print(f"  → Converted to WebP: {webp_filename} ({original_size:.1f}KB -> {webp_size:.1f}KB, saved {savings:.1f}%)")
                        stats['converted'] += 1
                        
                        # Update mapping to point to WebP
                        if old_filename in filename_mapping:
                            filename_mapping[old_filename] = webp_filename
                        else:
                            filename_mapping[old_filename] = webp_filename
                        
                        # Delete original if requested
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
    """
    Main function to process images: find, rename, update references, and convert.
    
    Args:
        image_directories: List of directories containing images
        source_base_dir: Base directory for source code
        quality: WebP quality (1-100)
        convert_to_webp: Whether to convert to WebP
        delete_original: Whether to delete originals after conversion
        update_references: Whether to update source code references
    """
    print("="*80)
    print("IMAGE PROCESSING SCRIPT")
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
    print("PROCESSING COMPLETE")
    print("="*80)
    print(f"Images renamed:          {rename_stats['renamed']}")
    print(f"Images converted:        {rename_stats['converted']}")
    print(f"Images skipped:          {rename_stats['skipped']}")
    print(f"Images failed:           {rename_stats['failed']}")
    print(f"Source files modified:   {update_stats['files_modified']}")
    print(f"Total replacements:      {update_stats['total_replacements']}")
    print("="*80)

def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Rename/sanitize images and optional WebP conversion.")
    parser.add_argument(
        "--yes", "-y",
        action="store_true",
        help="Run without waiting for Enter (non-interactive).",
    )
    return parser.parse_args()

if __name__ == "__main__":
    """
    Main execution block - configure your settings here
    """
    args = _parse_args()

    # ==================== CONFIGURATION ====================
    
    # Directories containing images to process
    IMAGE_DIRECTORIES = [
        './public/assets/images',
        './public/assets/images/brands',
        './public/assets/images/portfolio',
        './public/assets/images/services',
        # Add more directories as needed
    ]
    
    # Base directory for source code (where to search for references)
    SOURCE_BASE_DIR = '.'
    
    # WebP conversion quality (1-100, recommended: 85)
    QUALITY = 85
    
    # Convert images to WebP format
    CONVERT_TO_WEBP = True
    
    # Delete original files after successful conversion
    DELETE_ORIGINAL = True
    
    # Update references in source code files
    UPDATE_REFERENCES = True
    
    # =======================================================
    
    print("\n📋 CONFIGURATION:")
    print(f"   Image directories: {IMAGE_DIRECTORIES}")
    print(f"   Source base: {SOURCE_BASE_DIR}")
    print(f"   WebP quality: {QUALITY}")
    print(f"   Convert to WebP: {CONVERT_TO_WEBP}")
    print(f"   Delete originals: {DELETE_ORIGINAL}")
    print(f"   Update references: {UPDATE_REFERENCES}")
    print("\n" + "="*80)

    if not args.yes:
        input("\n⚠️  Press ENTER to start processing (or Ctrl+C to cancel)...")
        print()
    
    # Run the main processing function
    process_images(
        image_directories=IMAGE_DIRECTORIES,
        source_base_dir=SOURCE_BASE_DIR,
        quality=QUALITY,
        convert_to_webp=CONVERT_TO_WEBP,
        delete_original=DELETE_ORIGINAL,
        update_references=UPDATE_REFERENCES
    )

