import ContactMessagesPage from "@/src/components/admin/contact-messages/ContactMessagesPage";
import RequireRole from "@/src/components/auth/RequireRole";
export default function ContactMessagesRoute() {
  return (
    <RequireRole roles={["super_admin", "admin"]}>
      <ContactMessagesPage />
    </RequireRole>
  );
}