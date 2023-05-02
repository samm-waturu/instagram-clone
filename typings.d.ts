export interface HeadTypings {
    Icon: any;
    active?: boolean;
    className?: string;
    notify?: number;
    activeClass?: string;
    onClick?: object
}
export interface AtomProps {
    key: string
    default: boolean
    modalState: string
}
export interface StoryProp {
    username: string;
    img: any;
}
export interface FakerProp {
    id: string;
    image: string;
    username: string;
    caption: string;

}
export interface PostProps {
    Icons?: any;
    custom?: string;
    onClick?: object;

}
export interface ContactProp {
    id: string;
    name: string;
    image: string;
    company: string;
}