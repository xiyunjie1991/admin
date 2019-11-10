import request from "@/utils/request";
const url = process.env.BASE_API;
export function FindOrbs(data) {
  return request({
    url: url + "/admin/Orb/FindOrbs",
    method: "post",
    data
  });
}

export function UpdateOrb(
  id,
  name,
  nickname,
  avatar,
  intro,
  pictures,
  game_id,
  picture,
  is_official
) {
  return request({
    url: url + "/admin/Orb/UpdateOrb",
    method: "post",
    data: {
      id,
      name,
      nickname,
      avatar,
      intro,
      pictures,
      game_id,
      picture,
      is_official
    }
  });
}

export function GetOrbInfo(id) {
  return request({
    url: url + "/admin/Orb/GetOrbInfo",
    method: "post",
    data: {
      id
    }
  });
}

export function GetOrbInfoByRoomID(roomID) {
  return request({
    url: url + "/admin/Orb/GetOrbInfoByRoomID",
    method: "post",
    data: {
      room_id: roomID
    }
  });
}

export function GetOrbRoom(id) {
  return request({
    url: url + "/admin/Orb/GetOrbRoom",
    method: "post",
    data: {
      id
    }
  });
}

export function FindFeaturedOrbs(data) {
  return request({
    url: url + "/admin/Orb/FindFeaturedOrbs",
    method: "post",
    data
  });
}

export function UpdateFeaturedOrbs(orbs) {
  return request({
    url: url + "/admin/Orb/UpdateFeaturedOrbs",
    method: "post",
    data: {
      orbs
    }
  });
}

export function FindOrbRoomGroups(orb_id) {
  return request({
    url: url + "/admin/Orb/FindOrbRoomGroups",
    method: "post",
    data: {
      orb_id
    }
  });
}

export function FindOrbRoomGroupRooms(group_id) {
  return request({
    url: url + "/admin/Orb/FindOrbRoomGroupRooms",
    method: "post",
    data: {
      group_id
    }
  });
}

export function UpdateOrbRoom(id, group_id, name, type) {
  return request({
    url: url + "/admin/Orb/UpdateOrbRoom",
    method: "post",
    data: {
      id,
      group_id,
      name,
      type
    }
  });
}

export function UpdateOrbRoomGroup(id, orb_id, name) {
  return request({
    url: url + "/admin/Orb/UpdateOrbRoomGroup",
    method: "post",
    data: {
      id,
      orb_id,
      name
    }
  });
}

export function UpdateOrbRoomGroups(orb_id, groups) {
  return request({
    url: url + "/admin/Orb/UpdateOrbRoomGroups",
    method: "post",
    data: {
      orb_id,
      groups
    }
  });
}

export function UpdateOrbRooms(group_id, rooms) {
  return request({
    url: url + "/admin/Orb/UpdateOrbRooms",
    method: "post",
    data: {
      group_id,
      rooms
    }
  });
}

export function FindOrbRoom_Articles(query, page, page_size, room_id) {
  return request({
    url: url + "/admin/Orb/FindOrbRoom_Articles",
    method: "post",
    data: {
      query,
      page,
      page_size,
      room_id
    }
  });
}

export function CreateOrbRoom_Article(room_id, article_id) {
  return request({
    url: url + "/admin/Orb/CreateOrbRoom_Article",
    method: "post",
    data: {
      room_id,
      article_id
    }
  });
}

export function RemoveOrbRoom_Article(room_id, article_id) {
  return request({
    url: url + "/admin/Orb/RemoveOrbRoom_Article",
    method: "post",
    data: {
      room_id,
      article_id
    }
  });
}

export function FindRecommendedOrbs(data) {
  return request({
    url: url + "/admin/Orb/FindRecommendedOrbs",
    method: "post",
    data
  });
}

export function UpdateRecommendedOrbs(orb_ids) {
  return request({
    url: url + "/admin/Orb/UpdateRecommendedOrbs",
    method: "post",
    data: {
      orb_ids
    }
  });
}

export function RemoveOrb(id) {
  return request({
    url: url + "/admin/Orb/RemoveOrb",
    method: "post",
    data: {
      id
    }
  });
}

export function FindOrbUsers(page, page_size, query, orb_id) {
  return request({
    url: url + "/admin/Orb/FindOrbUsers",
    method: "post",
    data: {
      page,
      page_size,
      query,
      orb_id
    }
  });
}
