import { Title } from "@mantine/core";
import classes from "./Hero.module.css";
export const HomeHeroAlt = () => {
  return (
    <>
      <Title
        order={1}
        size="h1"
        // style={{ marginBottom: 40, textAlign: "center" }}
        // ta="center"
        className={classes.title}
      >
        Generate AI powered Alt Text for your images
      </Title>
    </>
  );
};
