import { queryBuilder } from "../../../config/Database";
import log from "../../../config/Logger";


// 모든 장소 보기
export const findAll = () => {
    const query = `
    select id, name, address, phone, employees, rooms, type, lat, lon , use_bus
    from p_day_care_centers;
    `;

    log.info(query);
    return queryBuilder(query, null)
        .then((data: any) => ({ success: true, message: "Get DayCareCenter list success", result: { total: data.rowCount, data: data.rows } }))
        .catch(error => ({ success: false, message: "Get DayCareCenter list false", error: error }));
}

// 모든 장소 보기(10개 씩)
export const findByOptions = (pageNumber: any, lat: any, lon: any) => {
    const query = `
    select id, name, address, phone, employees, rooms, type, lat, lon , use_bus
    from p_day_care_centers
    order by  ST_DistanceSphere(geom, ST_MakePoint(${lon},${lat}))
    limit 10 offset ${pageNumber};
    `;

    log.info(query);
    return queryBuilder(query, null)
        .then((data: any) => ({ success: true, message: "Get DayCareCenter list success", result: { total: data.rowCount, data: data.rows } }))
        .catch(error => ({ success: false, message: "Get DayCareCenter list false", error: error }));
}

// 장소 상세보기
export const findOne = (placeId: any) => {
    const query = `
    select id, name, address, phone, employees, rooms, type, lat, lon
    from p_day_care_centers
    where id = ${placeId};
    `;
    return queryBuilder(query, null)
        .then((data: any) => ({ success: true, message: "Get DayCareCenter detail success", result: data.rows }))
        .catch(error => ({ success: false, message: "Get DayCareCenter detail false", error: error }));
}
