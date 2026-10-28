import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import ContactForm from "@/src/components/forms/ContactForm";
import Card from "@/src/components/ui/Card";
import type { Metadata } from "next";
import { seo } from "@/src/app/seo";
export const metadata: Metadata = {
  title: seo.contact.title,
  description: seo.contact.description,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="space-y-16 px-6 py-12">
        {/* Introduction */}
        <section>
          <h2 className="mb-6 text-3xl font-bold bg-gradient-to-r from-sam-blue to-sam-yellow bg-clip-text text-transparent sm:text-4xl text-center">
            Get in Touch With Us
          </h2>
          <p className="mx-auto max-w-2xl text-center text-muted leading-relaxed">
            We’d love to connect with you! Whether you have a question, a
            prayer request, want to study the Bible, or are interested in
            partnering with us to spread the everlasting gospel, please feel
            free to reach out. We’re here to serve.
          </p>
        </section>

        {/* Contact Form */}
        <section>
          <h2 className="mb-8 text-center text-2xl font-bold text-sam-deepBlue sm:text-3xl">
            Send Us a Message
          </h2>
          <ContactForm />
        </section>

        {/* Other Contact Information */}
        <section className="mx-auto max-w-2xl">
          <Card className="p-8 space-y-8">
            <h2 className="text-2xl font-bold text-sam-deepBlue sm:text-3xl">
              Other Ways to Reach Us
            </h2>

            <div className="space-y-4 text-muted">
              <p>
                <strong className="text-foreground">Email:</strong>{" "}
                adventministries2000@gmail.com
              </p>
              <p>
                <strong className="text-foreground">Phone / WhatsApp:</strong>{" "}
                +254 795 044 356
              </p>
              <p>
                <strong className="text-foreground">Facebook / YouTube:</strong>{" "}
                Second Advent Ministries
              </p>
            </div>

            <div className="pt-6 border-t border-border">
              <h3 className="mb-3 text-lg font-semibold text-sam-deepBlue">
                Prayer Requests or Bible Study?
              </h3>
              <p className="leading-7 text-muted">
                If you’re looking for spiritual support, we’re here for you.
                Just type your prayer need or Bible study request in the
                message box above, and we’ll respond as soon as possible.
              </p>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
}

