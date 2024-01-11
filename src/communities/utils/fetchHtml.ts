export const fetchHtml = async (url: string): Promise<string | null> => {
    const html:Response = await fetch(url, {
        next: { revalidate: 86400 },
    })
    if (html.ok) {
        return html.text()
    }
    return null;
}