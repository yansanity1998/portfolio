/** Gallery photos, loaded in filename order (gallery-01 … gallery-15). */
export const galleryImages: { name: string; url: string }[] = Object.entries(
  import.meta.glob<string>('../assets/gallery/*.{jpg,png}', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url]) => ({ name: path.split('/').pop() as string, url }))

