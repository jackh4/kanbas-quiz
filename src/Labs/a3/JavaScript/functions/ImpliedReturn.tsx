const multiply = (a: number, b: number) => a * b;

function ImpliedReturn() {
    const fourTimesFive = multiply(4, 5);
    console.log(fourTimesFive);
    return (
        <>
            <h3>Implied Return</h3>
            fourTimesFive = {fourTimesFive}<br />
            multiply(4, 5) = {multiply(4, 5)}<br />
        </>
    );
}
export default ImpliedReturn