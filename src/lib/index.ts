// place files you want to import through the `$lib` alias in this folder.

import type { ProfileViewBasic } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

export interface CardData {
  $type: "app.skyshot.card";
  photoUrl: string;
  image?: {
    cid: string;
    url: string;
  };
  subject: ProfileViewBasic;
  photographer: ProfileViewBasic;
  metadata: {
    title: string;
    caption: string;
    createdAt: string;
    location: string;
  };
}
