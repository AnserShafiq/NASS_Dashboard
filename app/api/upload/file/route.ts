

export async function POST(request: Request){
    const form = await request.formData()
    // const file = form.get('file') as File;
    console.log(form)
}