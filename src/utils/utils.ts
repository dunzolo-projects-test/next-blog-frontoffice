export const slug = (title: String) => {
    return title
    .trim()
    .replaceAll(' ', '-')
    .replaceAll(',','')
    .replaceAll('.', '')
    .toLocaleLowerCase();
}