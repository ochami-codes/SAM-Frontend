export default function Footer() {
  return (
    <footer className="bg-blue-950 px-4 py-6 text-center text-yellow-400">
      <h3 className="text-lg font-semibold">
        Second Advent Ministries
      </h3>

      <p className="mt-2">
        Proclaiming the Everlasting Gospel to All the World in This Generation
      </p>

      <div className="mt-4 flex justify-center gap-5">
        <a
          href="https://www.facebook.com/profile.php?id=61559184882969"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Facebook
        </a>

        <a
          href="https://youtube.com/@2adventministries-y8x?si=XhFliTaGLzFkQZj3"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          YouTube
        </a>

        <a
          href="mailto:adventministries2000@gmail.com"
          className="hover:underline"
        >
          Email Us
        </a>
      </div>

      <p className="mt-4">
  © {new Date().getFullYear()} Second Advent Ministries. All Rights Reserved.
</p>


      <p className="mt-2 text-xs">
        &quot;Fear God, and give glory to Him...&quot; – Revelation 14:7
      </p>
    </footer>
  );
}