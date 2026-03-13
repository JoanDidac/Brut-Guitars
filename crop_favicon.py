import sys
from PIL import Image

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_square_favicon(input_path, output_path, hex_color):
    try:
        target_rgb = hex_to_rgb(hex_color)
        
        # Open the original logo
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Crop the left 25%
        crop_box = (0, 0, int(width * 0.25), height)
        cropped_img = img.crop(crop_box)
        
        # Get actual bounding box
        bbox = cropped_img.getbbox()
        if bbox:
            b_img = cropped_img.crop(bbox)
        else:
            b_img = cropped_img
            
        b_width, b_height = b_img.size
        
        # Recolor the 'B' pixels using the target color while keeping original alpha
        pixels = b_img.load()
        for y in range(b_height):
            for x in range(b_width):
                r, g, b, a = pixels[x, y]
                if a > 0:
                    pixels[x, y] = (target_rgb[0], target_rgb[1], target_rgb[2], a)
        
        # Create a square canvas
        max_dim = max(b_width, b_height)
        padding = int(max_dim * 0.1)
        square_size = max_dim + (padding * 2)
        
        square_img = Image.new("RGBA", (square_size, square_size), (0, 0, 0, 0))
        
        # Paste centered
        paste_x = (square_size - b_width) // 2
        paste_y = (square_size - b_height) // 2
        square_img.paste(b_img, (paste_x, paste_y))
        
        # Resize to 512x512
        final_favicon = square_img.resize((512, 512), Image.Resampling.LANCZOS)
        
        # Save the result
        final_favicon.save(output_path, format="PNG")
        print(f"Successfully created proportion-perfect square favicon ({hex_color}) and saved to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python script.py <input_img> <output_img> <hex_color>")
        sys.exit(1)
    create_square_favicon(sys.argv[1], sys.argv[2], sys.argv[3])
