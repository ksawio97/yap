// TODO add any inappropriate language filtering
export function reformPostContent(content: string) {
    // max \n in a row is 2
    const reformedContent = content.replaceAll(/\n{3,}/gm, '\n\n');
    return reformedContent;
}