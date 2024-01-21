import { AppShell, Group, ActionIcon, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import classes from "./Layout.module.css";

type Props = {
  children: React.ReactNode;
};

export const ApplicationLayout = ({ children }: Props) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <div className={classes.header}>
          <Group justify="space-between">
            <Text size="xl" fw={700}>
              {"Img Alt Text 🖼️"}
            </Text>

            <ActionIcon
              variant="transparent"
              color="gray"
              mx="md"
              aria-label="Github"
              component="a"
              href="https://github.com/n4ze3m/img-alt-text"
              target="_blank"
            >
              <IconBrandGithub size={24} />
            </ActionIcon>
          </Group>
        </div>
      </AppShell.Header>
      <AppShell.Main>
        <div className={classes.main}>{children}</div>
      </AppShell.Main>
    </AppShell>
  );
};
