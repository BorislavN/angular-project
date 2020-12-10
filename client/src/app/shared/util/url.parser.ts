const cloudUrl = "https://res.cloudinary.com/dqll1uvhe/image/upload/";

export function parseUrl(url: { url: String }, quality: String = " t_default"): String {
    const result = (url.url.split(cloudUrl)[1]).split("/")[1];
   
    return `${cloudUrl}${quality}/${result}`;
};

//q_40 - gets a lower quality image to reduce load time
//t_default - gets a lower quality image and cropped to 1000px