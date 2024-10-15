import { LoadingOverlay, Modal } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

function CustomModalComponent({
  opened,
  onClose,
  title,
  loading,
  children,
}: any) {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  let modalSize = "40%";

  if (isSmallScreen) {
    modalSize = "90%";
  } else if (isMediumScreen) {
    modalSize = "70%";
  }
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<div className="font-bold text-xl">{title}</div>}
      size={modalSize}
      radius={"sm"}
    >
      <LoadingOverlay
        zIndex={1000}
        visible={loading}
        overlayProps={{ blur: 1 }}
      />
      {children}
    </Modal>
  );
}

export default CustomModalComponent;
