<script lang="ts">
  import type { Card } from "$lib";
  import TemplateCard from "$lib/components/TemplateCard.svelte";
  import { AtpAgent } from "@atproto/api";
  import type { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

  let card: Card = $state({
    $type: "app.skyshot.card",
    photoUrl: "https://picsum.photos/id/64/300/400",
    metadata: {
      title: "Card Title",
      caption: "Card Caption",
      createdAt: new Date().toISOString(),
      location: "San Francisco, CA",
    },
    subject: {
      did: "did:plc:asdf",
      handle: "Subject Name",
    },
    photographer: {
      did: "did:plc:asdf",
      handle: "Photographer Name",
    },
  });

  function handleSubmit(e: FormDataEvent) {
    e.preventDefault();

    // Handle form submission logic here
    console.log("Form submitted:", e.formData);
  }

  const agent = new AtpAgent({ service: "https:/public.api.bsky.app" });
  let actors = $state<ProfileViewBasic[]>([]);

  function findBskyUser() {
    // Handle finding Bsky user logic here
    console.log("Finding Bsky user...");

    agent.searchActorsTypeahead({ q: card.subject.handle }).then((response) => {
      console.log("Found Bsky users:");
      response.data.actors.forEach((actor) => {
        console.log(actor);
      });
      actors = response.data.actors;
    });
  }
</script>

<div class="main-grid-container">
  <div class="grid-item">
    <TemplateCard {card} />
  </div>

  <div class="grid-item">
    <div class="card-form-container">
      <h2>Create New Card</h2>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="Subject Handle"
          bind:value={card.subject.handle}
          required
          oninput={findBskyUser}
        />
      </div>
      <div class="form-group">
        <label for="photographer">Photographer</label>
        <input
          type="text"
          id="photographer"
          bind:value={card.photographer.handle}
          required
        />
      </div>
      <div class="form-group">
        <label for="photo_url">Photo URL</label>
        <input type="url" id="photo_url" bind:value={card.photoUrl} required />
      </div>
      <div class="form-actions">
        <button type="button" class="cancel-button" onclick={history.back}>
          Cancel
        </button>
        <button type="submit" class="submit-button">Create Card</button>
      </div>
    </div>
  </div>
</div>

<style>
  .main-grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    align-items: center;
    justify-items: center;
  }
</style>
