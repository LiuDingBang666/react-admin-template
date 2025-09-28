/**
 * @name: 名称
 * @description: TODO 数据详情组件
 * @author: mayn
 * @date: 2025/9/28 11:23
 */
import React, {type ReactElement} from "react";


interface DescriptionItemProps {
    title: string;
    content: ReactElement;
}

const FormDetail: React.FC<DescriptionItemProps> = function FormDetail({ title, content }) {
    return (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );
}
export default FormDetail;