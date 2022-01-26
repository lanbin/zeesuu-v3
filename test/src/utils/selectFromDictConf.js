export default (ApiTemplateConst) => {
    const slFromDictNames = ['gas', 'dataType', 'valueType'];
    const slFromDictMap = {};
    // 循环组装
    slFromDictNames.forEach((dictName) => {
        slFromDictMap[`${dictName}Sl`] = {
            url: `${ApiTemplateConst}?dict=${dictName}`,
            label: 'name',
            value: 'id',
            key: 'rows',
        };
    });

    return slFromDictMap;
};
