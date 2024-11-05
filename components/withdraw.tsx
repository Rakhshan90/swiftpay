import { Card } from './ui/card';
import { CardHeader } from './ui/card';
import { CardTitle } from './ui/card';
import { CardContent } from './ui/card';
import { CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { SelectContent } from './ui/select';
import { SelectItem } from './ui/select';
import { SelectTrigger } from './ui/select';
import { SelectValue } from './ui/select';
import { Button } from './ui/button';

interface Bank {
    name: string,
    redirectUrl: string
}

export const Withdraw = ({ children, handleAmountChange, handleBankChange, SUPPORTED_BANKS, clickHandler }: { children: string, handleAmountChange: (value: number) => void, handleBankChange: (value: string) => void, SUPPORTED_BANKS: Bank[], clickHandler: () => void }) => {

    return (
        <Card className='w-80 lg:w-96 bg-slate-900 border-none'>
            <CardHeader>
                <CardTitle className='text-xl text-secondary-100 border-b pb-2 border-slate-400'>{children}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <div className="flex flex-col gap-2">
                    <Label className='text-slate-50'>Amount</Label>
                    <Input
                        type='number'
                        className='bg-slate-800 text-slate-50 border-none placeholder:text-slate-50'
                        placeholder='Enter amount'
                        onChange={(e) => handleAmountChange(Number(e.target.value))} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label className='text-slate-50'>Bank</Label>
                    <Select onValueChange={handleBankChange}>
                        <SelectTrigger className="bg-slate-800 text-slate-50 border-none placeholder:text-slate-50">
                            <SelectValue placeholder="HDFC Bank" className='text-slate-50' />
                        </SelectTrigger>
                        <SelectContent className='bg-slate-800 border-none text-slate-50'>
                            {SUPPORTED_BANKS?.map((item, index) => (
                                <SelectItem key={index} value={index.toString()}>
                                    {item?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
            <CardFooter className='flex items-center justify-center'>
                <Button onClick={clickHandler} className='bg-primary'>{children}</Button>
            </CardFooter>
        </Card>
    );
};