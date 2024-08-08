import Image from 'next/image';
import {getBlurData} from "@/UI/utilsForImage.js";

const CustomImage = ({ src, alt }) => {
    const { base64 } = getBlurData(src);

    return (
        <Image
            src={src}
            alt={alt}
            height={465}
            width={700}
            placeholder="blur"
            blurDataURL={base64}
        />
    );
};

export default CustomImage;
