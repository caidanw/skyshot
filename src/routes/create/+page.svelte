<script lang="ts">
  import type { CardData } from "$lib";
  import TemplateCard from "$lib/components/TemplateCard.svelte";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { AtpAgent } from "@atproto/api";
  import type { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

  let card: CardData = $state({
    $type: "app.skyshot.card",
    photoUrl: "https://picsum.photos/id/64/300/400",
    metadata: {
      title: "",
      caption: "",
      createdAt: new Date().toISOString(),
      location: "",
    },
    subject: {
      did: "",
      handle: "",
    },
    photographer: {
      did: "",
      handle: "",
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

  // card.subject.handle = "a";
  // findBskyUser();

  const handleImageUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        card.photoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };
</script>

<div class="main-grid-container">
  <div class="grid-item">
    <TemplateCard {card} />
  </div>

  <div class="grid-item">
    <Card.Root>
      <Card.Header>
        <Card.Title>Card Details</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-4">
        <div class="space-y-2 relative">
          <Label for="subject-handle">Subject</Label>
          <Input
            id="subject-handle"
            placeholder="Enter subject handle"
            bind:value={card.subject.handle}
            oninput={findBskyUser}
          />
          {#if actors.length > 0}
            <Card.Root class="absolute overflow-scroll max-h-60 w-full">
              {#each actors as actor (actor.did)}
                <button
                  class="flex items-center gap-2 p-2 hover:bg-accent cursor-pointer w-full text-left"
                  onclick={() => {
                    card.subject.did = actor.did;
                    card.subject.handle = actor.handle;
                    actors = [];
                  }}
                >
                  <Avatar.Root>
                    <Avatar.Image src={actor.avatar} alt={actor.handle} />
                    <Avatar.Fallback>
                      {actor.displayName?.substring(0, 2)}
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <p class="flex flex-col">
                    <span>{actor.displayName}</span>
                    <span class="text-sm text-muted-foreground">
                      {actor.handle}
                    </span>
                  </p>
                </button>
              {/each}
            </Card.Root>
          {/if}
        </div>
        <div class="space-y-2">
          <Label for="photographer-handle">Photographer</Label>
          <Input
            id="photographer-handle"
            placeholder="Enter photographer handle"
            bind:value={card.photographer.handle}
          />
        </div>
        <div class="space-y-2">
          <Label for="image">Photo</Label>
          <Input id="image" type="file" onchange={handleImageUpload} />
        </div>
      </Card.Content>
      <Card.Footer class="flex justify-between">
        <Button variant="destructive" onclick={history.back}>Cancel</Button>
        <Button type="submit" class="submit-button">Create Card</Button>
      </Card.Footer>
    </Card.Root>
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
