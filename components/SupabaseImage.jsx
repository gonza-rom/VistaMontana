import Image from 'next/image';

/**
 * Componente optimizado para imágenes de Supabase Storage
 * 
 * @param {string} src - Path de la imagen en Supabase (ej: "alojamientos/casa1.jpg")
 * @param {string} bucket - Nombre del bucket (default: "imagenes")
 * @param {number} width - Ancho de la imagen
 * @param {number} height - Alto de la imagen
 * @param {string} alt - Texto alternativo
 * @param {string} className - Clases CSS
 * @param {boolean} priority - Si debe cargarse con prioridad
 * @param {string} sizes - Responsive sizes
 * @param {string} quality - Calidad de compresión (1-100)
 */
export default function SupabaseImage({
  src,
  bucket = 'vistamontana',
  width,
  height,
  alt,
  className = '',
  priority = false,
  sizes,
  quality = 75,
  fill = false,
  ...props
}) {
  // URL base de Supabase Storage
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  // Construir URL completa
  const imageUrl = src.startsWith('http') 
    ? src 
    : `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${src}`;

  // Si es una imagen local (en /public)
  if (src.startsWith('/')) {
    return (
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className={className}
        priority={priority}
        quality={quality}
        sizes={sizes}
        fill={fill}
        {...props}
      />
    );
  }

  // Imagen de Supabase
  return (
    <Image
      src={imageUrl}
      width={width}
      height={height}
      alt={alt}
      className={className}
      priority={priority}
      quality={quality}
      sizes={sizes}
      fill={fill}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Ly4uOEBCOjhLPzYyQGBFRkdGR0dHR0dHR0dHR0dHR0f/2wBDAR=="
      {...props}
    />
  );
}