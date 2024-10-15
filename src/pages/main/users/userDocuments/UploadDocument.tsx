import { Button, FileInput } from "@mantine/core";
import CustomModalComponent from "@src/components/CustomModalComponent";
import apiProvider from "@src/network/apiProvider";
import { useState } from "react";
import { DocumentStore } from "./DocumentStore";
import { useParams } from "react-router-dom";

function UploadDocument({ opened, closed }: any) {
  const [files, setFiles] = useState<any | undefined>();
  const { fetchData } = DocumentStore();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function pdfSubmit() {
    const formData: any = new FormData();
    formData.append("userID", Number(id!));
    formData.append("files", files);

    files.forEach((file: File) => {
      formData.append("files", file);
    });

    const result = await apiProvider.uploadFiles(formData);
    setLoading(true);
    if (result != null) {
      setFiles(null);
      closed(false);
      fetchData(id);
    }
    setLoading(false);
  }

  function modalClose() {
    closed(false);
    setFiles(null);
  }
  return (
    <CustomModalComponent
      opened={opened}
      onClose={modalClose}
      title={"Upload Document"}
      loading={loading}
    >
      <FileInput
        withAsterisk
        accept="application/pdf"
        value={files}
        label="Upload files"
        placeholder="Upload pdf files"
        onChange={setFiles}
        multiple
        variant="filled"
      />
      <Button
        disabled={files == null}
        onClick={pdfSubmit}
        fullWidth
        className="mt-4"
      >
        Submit
      </Button>
    </CustomModalComponent>
  );
}

export default UploadDocument;
