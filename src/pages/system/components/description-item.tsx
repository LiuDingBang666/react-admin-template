/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/23 17:32
 */
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
export default DescriptionItem;