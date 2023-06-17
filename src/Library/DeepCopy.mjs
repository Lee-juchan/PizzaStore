/* 
    객체복사 함수 (deepCopy)

    + for Prototype Pattern

    deepCopy <--연관-- MenuManagement의 PizzaList       (Pizza객체(=프로토타입)를 deepcopy해서 새로운 피자 생성)
*/

const deepCopy = function (object) {
    // object 아니면, 바로 리턴
    if (object === null || typeof object !== "object") {
        return object;
    }

    // object면, 객체의 모든 key를 deepCopy (재귀)
    let copy = Array.isArray(object)? [] : {};// 빈 배열or객체 생성 (담을 공간)

    for (let key of Object.keys(object)) {
        copy[key] = deepCopy(object[key]);
    }
    return copy;
}

export default deepCopy;