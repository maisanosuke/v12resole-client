export default function formatDate (data){
    return new Date(data).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    });
}