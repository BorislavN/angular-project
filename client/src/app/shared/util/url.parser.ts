const cloudUrl = "https://res.cloudinary.com/dqll1uvhe/image/upload/";

export function parseUrl(url: { url: String }, quality: String = "q_40"): String {
    const result = (url.url.split(cloudUrl)[1]).split("/")[1];

    return `${cloudUrl}${quality}/${result}`;
};