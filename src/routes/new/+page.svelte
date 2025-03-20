
<script>
  import { AtpAgent } from '@atproto/api'

  const agent = new AtpAgent({ service: 'https://example.com' })
  
  let formData = {
    name: '',
    photographer: '',
    photo_url: ''
  };

  function handleSubmit() {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  }

  function findBskyUser() {
    // Handle finding Bsky user logic here
    console.log('Finding Bsky user...');
    
  }
</script>

<div class="card-form-container">
  <h2>Create New Card</h2>
  <form class="card-form" on:submit|preventDefault={handleSubmit}>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" bind:value={formData.name} required oninput={findBskyUser}>
    </div>
    <div class="form-group">
      <label for="photographer">Photographer</label>
      <input type="text" id="photographer" bind:value={formData.photographer} required>
    </div>
    <div class="form-group">
      <label for="photo_url">Photo URL</label>
      <input type="url" id="photo_url" bind:value={formData.photo_url} required>
    </div>
    <div class="form-actions">
      <button type="button" class="cancel-button" onclick="history.back()">Cancel</button>
      <button type="submit" class="submit-button">Create Card</button>
    </div>
  </form>
</div>
