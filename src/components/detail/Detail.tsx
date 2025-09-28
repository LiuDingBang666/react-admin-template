/**
 * @name: 名称
 * @description: TODO 数据详情组件
 * @author: mayn
 * @date: 2025/9/28 11:23
 */
import type {JSX} from "react";


interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

export function Detail({ title, content }: DescriptionItemProps): JSX.Element {
    return (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );
}