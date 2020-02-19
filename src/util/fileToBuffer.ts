const fileToBuffer = async (file: File) => Buffer.from(await new Response(file).arrayBuffer());

export default fileToBuffer;