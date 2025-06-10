import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LinkProps extends RouterLinkProps {
  className?: string;
}

export const Link = ({ className, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={cn(
        'text-primary-600 hover:text-primary-700 transition-colors',
        className
      )}
      {...props}
    />
  );
};
