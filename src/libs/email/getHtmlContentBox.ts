export default function getHtmlContentBox(headerText: string, contentText: string, linkText: string, link: string) {
return `<div style="font-family: Arial, sans-serif; line-height: 1.5;">
    <h1 style="font-size: 24px; margin-bottom: 20px;">${headerText}</h1>
    <p style="font-size: 16px; margin-bottom: 20px;">${contentText}</p>
    <a href="${link}" target="_blank" style="display: inline-block; font-size: 16px; color: #FFFFFF; background-color: #f59e0b; text-decoration: none; padding: 10px 20px; border-radius: 5px;">${linkText}</a>
</div>`
}