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
  import html2canvas from "html2canvas";

  let card: CardData = $state({
    $type: "app.skyshot.card",
    photoUrl: "https://placehold.co/800?text=placeholder\\nimage&font=roboto",
    metadata: {
      title: "",
      caption: "",
      location: "",
      createdAt: "",
    },
    subject: {
      did: "",
      handle: "",
      displayName: "",
      avatar: "",
      labels: [],
      createdAt: "",
    },
    photographer: {
      did: "did:plc:2vjaeco3bs24mv5kdrjlzrbr",
      handle: "caidan.dev",
      displayName: "Caidan",
      avatar:
        "https://cdn.bsky.app/img/avatar/plain/did:plc:2vjaeco3bs24mv5kdrjlzrbr/bafkreiejz5ftbsjcpdn6mdfbm6divk4ofjkfv2wr2gqwtvnf7p2fnjnaoq@jpeg",
      labels: [],
      createdAt: "2023-06-30T02:42:56.424Z",
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
    if (!card.subject?.handle) return;

    agent
      .searchActorsTypeahead({ q: card.subject.handle })
      .then((response) => {
        console.log("Found Bsky users:");
        response.data.actors.forEach((actor) => {
          console.log(actor);
        });
        actors = response.data.actors;
      })
      .catch((error) => {
        console.error("Failed to find Bsky users:", error);
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

  function downloadImage() {
    const selector = "#capture-me";
    const elem = document.querySelector(selector) satisfies HTMLElement | null;
    if (!elem) {
      throw new Error(`HTMLElement not found for selector '${selector}'`);
    }

    html2canvas(elem, {
      backgroundColor: null,
      windowWidth: elem.scrollWidth,
      windowHeight: elem.scrollHeight,
    }).then((canvas) => {
      let link = document.createElement("a");
      // TODO: the @ symbol might cause issues, but I like it for now
      link.download = `skyshot@${card.subject.handle}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
</script>

<main class="container p-8 flex-1 flex flex-col">
  <div class="main-grid-container grid-cols-1 sm:grid-cols-2">
    <div id="capture-me" class="grid-item">
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
              onblur={() => {
                actors = [];
              }}
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
          <Button
            onclick={(e) => {
              e.preventDefault();
              console.log("downloadImage");
              downloadImage();
            }}>Download Card</Button
          >
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</main>

<style>
  .main-grid-container {
    display: grid;
    gap: 2rem;
    align-items: center;
    justify-items: center;
  }
</style>
