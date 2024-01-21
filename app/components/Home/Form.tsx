import classes from "./Form.module.css";
import {
  Text,
  FileInput,
  Select,
  Button,
  Group,
  ActionIcon,
  Paper,
  Divider,
  CopyButton,
  Tooltip,
  rem,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import { IconCheck, IconCopy, IconSparkles } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { toBase64 } from "~/utils/to-base64";
import { notifications } from "@mantine/notifications";
import { useScrollIntoView } from "@mantine/hooks";
import React from "react";
import { HomeInfoAlt } from "./Info";
import { ClientOnly } from "../ClientOnly";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export const HomeFormAlt = () => {
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const [generatedText, setGeneratedText] = React.useState<string | null>(null);

  const form = useForm({
    initialValues: {
      image: null,
      response_format: "formal",
    },
    validate: {
      image: (value) => (!value ? "Image is required" : null),
      response_format: (value) =>
        !value ? "Response format is required" : null,
    },
  });

  const generateRequest = async (values: any) => {
    const image_base64 = await toBase64(values.image);
    const data = {
      base64: image_base64,
      response_format: values.response_format,
      token: values.token,
    };

    const response = await fetch(`/api/v1/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  };

  const { mutate: generate, isPending: isGenerating } = useMutation({
    mutationFn: generateRequest,
    onError: (error) => {
      window?.grecaptcha?.reset();
      notifications.show({
        title: "Error",
        message: error?.message || "Something went wrong",
        color: "red",
      });
    },
    onSuccess: (data) => {
      window?.grecaptcha?.reset();
      setGeneratedText(data.response);
      scrollIntoView();
    },
  });

  return (
    <div className={classes.form}>
      <Paper radius="md" p="xl" withBorder>
        <form
          onSubmit={form.onSubmit((e) => {
            const recaptchaResponse = window?.grecaptcha?.getResponse();
            if (!recaptchaResponse) {
              notifications.show({
                title: "Error",
                message: "Please complete the captcha",
                color: "red",
              });
              return;
            }
            generate({ ...e, token: recaptchaResponse });
          })}
        >
          <FileInput
            mb="lg"
            size="md"
            label="Upload Image"
            placeholder="Upload image"
            accept="image/jpeg, image/png, image/jpg"
            required
            {...form.getInputProps("image")}
          />
          <Select
            mb="lg"
            size="md"
            data={[
              { value: "formal", label: "Formal" },
              { value: "casual", label: "Casual" },
              { value: "professional", label: "Professional" },
              { value: "elegant", label: "Elegant" },
              { value: "funny", label: "Funny" },
              { value: "genz", label: "Gen Z" },
            ]}
            label="Select Response Format"
            placeholder="Select Response Format"
            required
            {...form.getInputProps("response_format")}
          />
          <div
            className="g-recaptcha"
            data-sitekey="6LdiqVcpAAAAANuur8xdeOZNug31L7JrEntUbwQy"
          ></div>

          <Button
            leftSection={<IconSparkles size={20} />}
            type="submit"
            fullWidth
            size="md"
            mt="md"
            loading={isGenerating}
            color="teal"
          >
            Generate Alt Text
          </Button>
        </form>
      </Paper>

      <div ref={targetRef}>
        {generatedText && (
          <Paper radius="md" mt="md" p="xl" withBorder>
            <Text>{generatedText}</Text>

            <Divider mt="md" mb="md" />

            <Group justify="space-between">
              <Text c="gray" size="xs">
                {`${generatedText.length} characters`}
              </Text>

              <CopyButton value={generatedText} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : "Copy"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon
                      color={copied ? "teal" : "gray"}
                      variant="subtle"
                      onClick={copy}
                    >
                      {copied ? (
                        <IconCheck style={{ width: rem(16) }} />
                      ) : (
                        <IconCopy style={{ width: rem(16) }} />
                      )}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Group>
          </Paper>
        )}
      </div>

      <HomeInfoAlt />
    </div>
  );
};
