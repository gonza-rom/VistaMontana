export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-10 py-6">
      <div className="container mx-auto text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Vista Montaña — Balcozna, Catamarca · Todos los derechos reservados
      </div>
    </footer>
  );
}
