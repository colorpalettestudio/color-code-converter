export function parseStudioCode(studioCode: string): string[] {
  try {
    // Remove "studiocode?" prefix if present
    const queryString = studioCode.replace(/^studiocode\?/i, '');
    
    // Parse query string into URLSearchParams
    const params = new URLSearchParams(queryString);
    
    // Get the colorNames parameter
    const colorNamesParam = params.get('colorNames');
    if (!colorNamesParam) {
      throw new Error('No colorNames found in studio code');
    }
    
    // Parse the JSON array
    const colorData = JSON.parse(colorNamesParam);
    
    // Extract hex values
    if (!Array.isArray(colorData)) {
      throw new Error('Invalid color data format');
    }
    
    const hexColors = colorData
      .map((item: any) => item.hex)
      .filter((hex: any) => typeof hex === 'string' && hex.startsWith('#'));
    
    if (hexColors.length === 0) {
      throw new Error('No valid colors found in studio code');
    }
    
    return hexColors;
  } catch (error) {
    console.error('Error parsing studio code:', error);
    throw new Error('Invalid studio code format. Please check and try again.');
  }
}
