export default function formatCurrency(num){
    return new Intl.NumberFormat(undefined, {style: 'currency', currency: 'USD'}).format(num);
}