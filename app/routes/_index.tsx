import type { MetaFunction } from "@remix-run/node";
import { ClientOnly } from "~/components/ClientOnly";
import { HomeFormAlt } from "~/components/Home/Form";
import { HomeHeroAlt } from "~/components/Home/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "Img Alt Text 🖼️" },
    {
      name: "description",
      content: "Free AI powered alt text generator for your images",
    },
    {
      name: "keywords",
      content: "alt text, ai, artificial intelligence, machine learning, image",
    },
  ];
};

export default function Index() {
  return (
    <>
      <HomeHeroAlt />
      <ClientOnly>{() => <HomeFormAlt />}</ClientOnly>
    </>
  );
}
