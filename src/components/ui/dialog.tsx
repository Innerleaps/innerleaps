import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        /**
         * Op een telefoon vult een pop-up het scherm, en meet hij zich aan de
         * hoogte die er werkelijk zichtbaar is.
         *
         * Zonder dit stond hij gecentreerd op `max-h-90vh`, en die 90% wordt
         * gerekend over de layout-viewport van 812 pixels. Met het toetsenbord
         * open zie je daar 450 van, dus ruim de helft van de pop-up viel
         * permanent onder het toetsenbord. Bij het invullen probeerde Safari
         * daar tegenin te scrollen en schoof de inhoud naar de onderkant, zodat
         * het veld met de focus boven beeld verdween.
         *
         * De pop-up vult op een telefoon simpelweg het hele scherm en scrollt
         * van binnen. Hem aan het zichtbare venster plakken is geprobeerd en
         * afgeserveerd: dat is een race met Safari, en dan zie je onder de
         * pop-up door de pagina erachter. Het veld op de goede plek zetten doet
         * src/lib/veldInBeeld.ts, achteraf en dus zonder race.
         */
        "max-sm:inset-0 max-sm:h-auto max-sm:max-h-none max-sm:w-full max-sm:max-w-none max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none",
        /**
         * En geen zweefanimatie op een schermvullend paneel.
         *
         * De open-animatie schuift het kader vanaf 48% erboven naar binnen en
         * schaalt het van 95% naar vol. Op een kaartje dat midden in beeld
         * verschijnt is dat aardig, op een paneel dat het hele scherm vult niet:
         * dan zie je de hele pagina even scheef staan. Alleen de vervaging
         * blijft. De verplaatsing en de schaling zetten we hier op nul, via de
         * variabelen die tailwindcss-animate zelf gebruikt.
         */
        "max-sm:data-[state=open]:[--tw-enter-translate-x:0px] max-sm:data-[state=open]:[--tw-enter-translate-y:0px] max-sm:data-[state=open]:[--tw-enter-scale:1] max-sm:data-[state=closed]:[--tw-exit-translate-x:0px] max-sm:data-[state=closed]:[--tw-exit-translate-y:0px] max-sm:data-[state=closed]:[--tw-exit-scale:1]",
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-base text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
