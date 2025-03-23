<script lang="ts">
  import { AtpAgent } from "@atproto/api";
  import type { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

  let formData = {
    name: "",
    photographer: "",
    photo_url: "",
  };

  function handleSubmit(e: Event) {
    e.preventDefault();

    // Handle form submission logic here
    console.log("Form submitted:", formData);
  }

  const agent = new AtpAgent({ service: "https:/public.api.bsky.app" });
  let actors = $state<ProfileViewBasic[]>([]);

  function findBskyUser() {
    // Handle finding Bsky user logic here
    console.log("Finding Bsky user...");

    agent.searchActorsTypeahead({ q: formData.name }).then((response) => {
      console.log("Found Bsky users:");
      response.data.actors.forEach((actor) => {
        console.log(actor);
      });
      actors = response.data.actors;
    });
  }
</script>

<main class="container p-8 flex-1 flex flex-col">
  <div class="card-form-container">
    <h2>Create New Card</h2>
    <form class="card-form" onsubmit={handleSubmit}>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          bind:value={formData.name}
          required
          oninput={findBskyUser}
        />
      </div>
      <div class="form-group">
        <label for="photographer">Photographer</label>
        <input
          type="text"
          id="photographer"
          bind:value={formData.photographer}
          required
        />
      </div>
      <div class="form-group">
        <label for="photo_url">Photo URL</label>
        <input
          type="url"
          id="photo_url"
          bind:value={formData.photo_url}
          required
        />
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-button" onclick={history.back}>
          Cancel
        </button>
        <button type="submit" class="submit-button">Create Card</button>
      </div>
    </form>
  </div>
</main>
