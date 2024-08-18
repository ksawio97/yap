export default function checkIsStringArray(arr: any[] | undefined | null) {
    if (!arr || !Array.isArray(arr) || !arr.every((postId) => typeof postId === 'string'))
        return null;
    return arr as string[];
}