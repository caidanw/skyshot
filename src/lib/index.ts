// place files you want to import through the `$lib` alias in this folder.

export interface CardData {
  $type: "app.skyshot.card";
  photoUrl: string;
  subject: {
    did: string;
    handle: string;
  };
  photographer: {
    did: string;
    handle: string;
  };
  metadata: {
    title: string;
    caption: string;
    createdAt: string;
    location: string;
  };
}
