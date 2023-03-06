import React from "react";
import {Card, Table, Button, Popconfirm, Space, List} from "antd";
import {
    useFetchArticleQuery,
} from "./service/article-api";
import { NavLink } from "react-router-dom";
import {API_ROOT} from "../../utils/global-var";

export function ArticleVueClientPage() {
    const articles = useFetchArticleQuery();
    console.log(articles);
    return (
        <div className="home-page ArticleList">
            {articles && articles.isSuccess && (
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={articles.data}
                    renderItem={item => (
                        <List.Item>
                            <div className="article">
                               <div className="image">
                                   <img className="imgArticle" src={item.image ? API_ROOT+'/'+item.image : API_ROOT+'/default.png'} alt={item.title} />
                               </div>
                                <Card title={item.title}>
                                    <p className="articleText" dangerouslySetInnerHTML={{ __html: item.description }} />
                                </Card>
                                <div className="articleFooter">
                                    {item.category}
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
}
export default ArticleVueClientPage;
