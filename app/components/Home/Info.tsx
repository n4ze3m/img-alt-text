import { Text } from "@mantine/core";
import classes from "./Info.module.css";
export const HomeInfoAlt = () => {
  return (
    <>
      <Text
        size="sm" 
        c="gray"
        className={classes.info}
      >
        Generated AI Alt Text may not be perfect; always double-check!
      </Text>
    </>
  );
};
