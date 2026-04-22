# VariGen API Integration Guide

This guide explains how to connect the VariGen model test interface to your backend API.

## Current Implementation

The StudentModelsPage component now includes:
- File upload state management (`isUploading`, `apiResult`, `uploadedFileName`)
- A `handleFileUpload` function with mock API call structure
- Loading states and success feedback in the UI
- Support for displaying API-generated waveform data

## Step 1: Update API Endpoint

In `/src/app/components/StudentModelsPage.tsx`, find the `handleFileUpload` function (around line 38) and uncomment the actual API call:

```typescript
const response = await fetch('https://your-api-endpoint.com/v1/varigen/generate', {
  method: 'POST',
  body: formData,
});

if (!response.ok) throw new Error('Generation failed');

const data = await response.json();
setApiResult(data.variation_url || data.audio_url);
```

Replace `'https://your-api-endpoint.com/v1/varigen/generate'` with your actual endpoint.

## Step 2: Expected API Response Format

Your backend should return JSON in this format:

```json
{
  "variation_url": "https://your-cdn.com/generated-files/variation_abc123.mid",
  "audio_url": "https://your-cdn.com/generated-files/variation_abc123.mp3",
  "waveform_data": [45, 67, 23, ...] // Optional: array of 60 numbers (0-100)
}
```

- `variation_url`: URL to the generated MIDI file
- `audio_url`: (Optional) URL to audio rendering of the MIDI
- `waveform_data`: (Optional) Array of waveform peak values for visualization

## Step 3: Enable Audio Playback

In the "Play Variation" button handler (around line 510), uncomment:

```typescript
const audio = new Audio(apiResult.variation_url);
audio.play().catch(err => {
  console.error('Playback error:', err);
  setShowDemoWarning(true);
});
```

This will play the audio file returned by your API.

## Step 4: Handle CORS Issues

Your backend needs to allow cross-origin requests. Add these headers:

### Python (Flask)
```python
from flask_cors import CORS
CORS(app)
```

### Node.js (Express)
```javascript
app.use(cors({
  origin: 'https://your-figma-make-domain.com'
}));
```

### Direct Headers
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## Step 5: Progress Tracking (Optional)

For large file uploads, you can add progress tracking using Axios:

```bash
pnpm add axios
```

```typescript
import axios from 'axios';

const handleFileUpload = async (file: File) => {
  setIsUploading(true);
  const formData = new FormData();
  formData.append('midi_file', file);

  try {
    const response = await axios.post('YOUR_API_ENDPOINT', formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        console.log(`Upload: ${percentCompleted}%`);
        // You could set this to state and show a progress bar
      }
    });
    
    setApiResult(response.data.variation_url);
  } catch (error) {
    console.error('API Error:', error);
  } finally {
    setIsUploading(false);
  }
};
```

## API Request Structure

The file upload uses FormData with these fields:

| Field | Type | Description |
|-------|------|-------------|
| `midi_file` | File | The uploaded MIDI file |
| `model_id` | string | ID of the selected model (1 for VariGen) |

## Testing

1. **Without API**: The current implementation uses a 2-second mock delay and returns dummy data
2. **With API**: Replace the mock section with the real fetch call
3. **Error Handling**: Errors will display the "This is an educational prototype" toast

## Security Notes

- Never commit API keys to the repository
- Use environment variables for sensitive data
- Validate file types and sizes on the backend
- Implement rate limiting to prevent abuse
