import request from '@/utils/request'
const url = process.env.BASE_API

export function FindArticles(data) {
  return request({
    url: url + '/admin/Article/FindArticles',
    method: 'post',
    data
  })
}

export function UpdateArticle(id, title, picture, video, show_type, content) {
  return request({
    url: url + '/admin/Article/UpdateArticle',
    method: 'post',
    data: {
      id,
      title,
      picture,
      video,
      show_type,
      content
    }
  })
}

export function GetArticle(id) {
  return request({
    url: url + '/admin/Article/GetArticle',
    method: 'post',
    data: {
      id
    }
  })
}

export function FindFeaturedArticles(query, page, page_size) {
  return request({
    url: url + '/admin/Article/FindFeaturedArticles',
    method: 'post',
    data: {
      query,
      page,
      page_size
    }
  })
}

export function CreateFeaturedArticle(room_id, article_id) {
  return request({
    url: url + '/admin/Article/CreateFeaturedArticle',
    method: 'post',
    data: {
      room_id,
      article_id
    }
  })
}

export function DeleteArticle(id) {
  return request({
    url: url + '/admin/Article/DeleteArticle',
    method: 'post',
    data: {
      id
    }
  })
}

export function RemoveFeaturedArticle(article_id) {
  return request({
    url: url + '/admin/Article/RemoveFeaturedArticle',
    method: 'post',
    data: {
      article_id
    }
  })
}

export function FindArticleSearchHotKeywords(days, limit) {
  return request({
    url: url + '/admin/Article/FindArticleSearchHotKeywords',
    method: 'post',
    data: {
      days,
      limit
    }
  })
}

export function UpdateFeaturedArticleHotKeywords(keywords) {
  return request({
    url: url + '/admin/Article/UpdateFeaturedArticleHotKeywords',
    method: 'post',
    data: {
      keywords
    }
  })
}

export function FindFeaturedArticleHotKeywords() {
  return request({
    url: url + '/admin/Article/FindFeaturedArticleHotKeywords',
    method: 'post',
    data: {
    }
  })
}

export function FindArticleReferences(article_id) {
  return request({
    url: url + '/admin/Article/FindArticleReferences',
    method: 'post',
    data: {
      article_id
    }
  })
}

