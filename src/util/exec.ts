/* eslint-disable no-new-func */
const exec = (params: { [key: string]: {} }, code: string) => {
    try {
        return (new Function(
            ...Object.keys(params),
            `return ${code}`,
        ))(
            ...Object.values(params),
        );
    } catch (error) {
        return { error: error.toString() };
    }
};

export default exec;