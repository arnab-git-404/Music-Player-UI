// src/utils/colorExtractor.js

/**
 * Extract dominant color from an image
 * @param {string} imageUrl - URL of the image
 * @returns {Promise<string>} - RGB color value
 */
export const extractDominantColor = async (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      
      img.onload = () => {
        // Create canvas to analyze image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image on canvas
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        // Get pixel data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        
        // Simple color averaging for demonstration
        // A more sophisticated algorithm would use color quantization
        let r = 0, g = 0, b = 0;
        let count = 0;
        
        // Sample pixels (every 5th pixel for performance)
        for (let i = 0; i < imageData.length; i += 20) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }
        
        // Calculate average
        r = Math.floor(r / count);
        g = Math.floor(g / count);
        b = Math.floor(b / count);
        
        // Darken the color for better visual effect as background
        r = Math.floor(r * 0.8);
        g = Math.floor(g * 0.8);
        b = Math.floor(b * 0.8);
        
        resolve(`rgb(${r}, ${g}, ${b})`);
      };
      
      img.onerror = () => {
        // Default color if loading fails
        resolve('rgb(33, 33, 33)');
      };
      
      img.src = imageUrl;
    });
  };