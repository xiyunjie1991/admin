import request from "@/utils/request";
const url = process.env.BASE_API;
export function FindGameTypes(data) {
  return request({
    url: url + "/admin/Game/FindGameTypes",
    method: "get",
    params: { data }
  });
}

export function FindGameModes(data) {
  return request({
    url: url + "/admin/Game/FindGameModes",
    method: "get",
    params: { data }
  });
}

export function FindGamePlatforms(data) {
  return request({
    url: url + "/admin/Game/FindGamePlatforms",
    method: "get",
    params: { data }
  });
}

export function UpdateGame(data) {
  return request({
    url: url + "/admin/Game/UpdateGame",
    method: "post",
    data
  });
}

export function FindGames(data) {
  return request({
    url: url + "/admin/Game/FindGames",
    method: "post",
    data
  });
}

export function GetGameInfo(data) {
  return request({
    url: url + "/admin/Game/GetGameInfo",
    method: "post",
    data
  });
}

export function GetGameInfoByPediaItemID(itemID) {
  return request({
    url: url + "/admin/Game/GetGameInfoByPediaItemID",
    method: "post",
    data: {
      item_id: itemID
    }
  });
}

export function UpdateGamePlatformInfo(data) {
  return request({
    url: url + "/admin/Game/UpdateGamePlatformInfo",
    method: "post",
    data
  });
}

export function DeleteGamePlatformInfo(game_id, platform_id) {
  return request({
    url: url + "/admin/Game/DeleteGamePlatformInfo",
    method: "post",
    data: {
      game_id,
      platform_id
    }
  });
}

// 获取游戏百科分类
export function FindGamePediaGroups(game_id) {
  return request({
    url: url + "/admin/Game/FindGamePediaGroups",
    method: "post",
    data: {
      game_id
    }
  });
}

// 更新游戏的百科分类
export function UpdateGamePediaGroups(game_id, groups) {
  return request({
    url: url + "/admin/Game/UpdateGamePediaGroups",
    method: "post",
    data: {
      game_id,
      groups
    }
  });
}

// 删除游戏的百科分类
export function DeleteGamePediaGroup(id, game_id) {
  return request({
    url: url + "/admin/Game/DeleteGamePediaGroup",
    method: "post",
    data: {
      id,
      game_id
    }
  });
}

// 创建游戏的百科分类
export function CreateGamePediaGroup(game_id, name) {
  return request({
    url: url + "/admin/Game/CreateGamePediaGroup",
    method: "post",
    data: {
      game_id,
      name
    }
  });
}

// 创建游戏的百科词条
export function CreateGamePediaItem(group_id, name, article_id) {
  return request({
    url: url + "/admin/Game/CreateGamePediaItem",
    method: "post",
    data: {
      group_id,
      name,
      article_id
    }
  });
}

// 查找游戏的百科词条
export function FindGamePediaItems(group_id) {
  return request({
    url: url + "/admin/Game/FindGamePediaItems",
    method: "post",
    data: {
      group_id
    }
  });
}

// 创建游戏的百科分类
export function DeleteGamePediaItem(id, group_id) {
  return request({
    url: url + "/admin/Game/DeleteGamePediaItem",
    method: "post",
    data: {
      id,
      group_id
    }
  });
}

// 创建游戏的百科分类
export function UpdateGamePediaItems(group_id, items) {
  return request({
    url: url + "/admin/Game/UpdateGamePediaItems",
    method: "post",
    data: {
      group_id,
      items
    }
  });
}
